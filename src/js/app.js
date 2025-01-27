import { isPasswordSecure, generateSecurePassword } from './passwordUtils.js';

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('passwordInput');
    const checkButton = document.getElementById('checkPasswordBtn');
    const resultDisplay = document.getElementById('passwordFeedback');
    const generateButton = document.getElementById('generatePasswordBtn');
    const securePasswordDisplay = document.getElementById('generatedPassword');

    checkButton.addEventListener('click', () => {
        const password = passwordInput.value;
        const isSecure = isPasswordSecure(password);
        resultDisplay.textContent = isSecure ? 'La contraseña es segura.' : 'La contraseña no es segura.';
    });

    generateButton.addEventListener('click', () => {
        const lengthInput = document.getElementById('passwordLength').value;
        const length = parseInt(lengthInput);

        if (isNaN(length) || length < 8 || length > 20) {
            securePasswordDisplay.textContent = 'Por favor, introduce un número entre 8 y 20.';
        } else {
            const securePassword = generateSecurePassword(length);
            securePasswordDisplay.textContent = `Contraseña segura generada: ${securePassword}`;
        }
    });
});