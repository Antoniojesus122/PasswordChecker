export function checkPasswordStrength(password) {
    const strength = {
        score: 0,
        requirements: {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        }
    };

    // Calcular puntuación
    Object.values(strength.requirements).forEach(requirement => {
        if (requirement) strength.score++;
    });

    // Bonus por longitud extra
    if (password.length >= 12) strength.score++;
    if (password.length >= 16) strength.score++;

    return strength;
}

export function generateSecurePassword(options) {
    const charsets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let charset = '';
    let password = '';

    // Construir charset basado en opciones
    if (options.uppercase) charset += charsets.uppercase;
    if (options.lowercase) charset += charsets.lowercase;
    if (options.numbers) charset += charsets.numbers;
    if (options.symbols) charset += charsets.symbols;

    // Asegurar que al menos un carácter de cada tipo seleccionado está incluido
    if (options.uppercase) password += charsets.uppercase[Math.floor(Math.random() * charsets.uppercase.length)];
    if (options.lowercase) password += charsets.lowercase[Math.floor(Math.random() * charsets.lowercase.length)];
    if (options.numbers) password += charsets.numbers[Math.floor(Math.random() * charsets.numbers.length)];
    if (options.symbols) password += charsets.symbols[Math.floor(Math.random() * charsets.symbols.length)];

    // Completar el resto de la contraseña
    while (password.length < options.length) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // Mezclar la contraseña
    return password.split('').sort(() => Math.random() - 0.5).join('');
}