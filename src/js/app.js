import { checkPasswordStrength, generateSecurePassword } from './passwordUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    // Elementos DOM
    const passwordInput = document.getElementById('passwordInput');
    const meterBar = document.querySelector('.meter-bar');
    const requirements = document.querySelectorAll('.requirement');
    const lengthSlider = document.getElementById('passwordLength');
    const lengthValue = document.getElementById('lengthValue');
    const generatedPasswordInput = document.getElementById('generatedPassword');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const copyPasswordBtn = document.getElementById('copyPassword');

    // Función para actualizar el medidor de fuerza
    function updateStrengthMeter(password) {
        const strength = checkPasswordStrength(password);
        const percentage = (strength.score / 7) * 100;
        
        meterBar.style.width = `${percentage}%`;
        meterBar.style.backgroundColor = 
            percentage <= 33 ? 'var(--danger-color)' :
            percentage <= 66 ? 'var(--warning-color)' :
            'var(--success-color)';

        // Actualizar indicadores de requerimientos
        requirements.forEach(req => {
            const requirement = req.dataset.requirement;
            if (strength.requirements[requirement]) {
                req.classList.add('valid');
            } else {
                req.classList.remove('valid');
            }
        });
    }

    // Event Listeners
    passwordInput.addEventListener('input', (e) => {
        updateStrengthMeter(e.target.value);
    });

    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePasswordBtn.innerHTML = `<i class="fas fa-eye${type === 'password' ? '' : '-slash'}"></i>`;
    });

    lengthSlider.addEventListener('input', (e) => {
        lengthValue.textContent = e.target.value;
    });

    document.getElementById('generatePasswordBtn').addEventListener('click', () => {
        const options = {
            length: parseInt(lengthSlider.value),
            uppercase: document.getElementById('includeUppercase').checked,
            lowercase: document.getElementById('includeLowercase').checked,
            numbers: document.getElementById('includeNumbers').checked,
            symbols: document.getElementById('includeSymbols').checked
        };

        const password = generateSecurePassword(options);
        generatedPasswordInput.value = password;
    });

    copyPasswordBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(generatedPasswordInput.value);
            copyPasswordBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyPasswordBtn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        } catch (err) {
            console.error('Error al copiar:', err);
        }
    });
});