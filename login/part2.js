document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const continueButton = document.querySelector('.continue');

    continueButton.addEventListener('click', function () {
        // Validate email and password length
        const isValidEmail = validateEmail(emailInput.value);
        const isValidPassword = validatePassword(passwordInput.value);

        if (isValidEmail && isValidPassword) {
            // Redirect to part1.html
            window.location.href = 'part1.html';
        } else {
            // Show error messages or take other actions
            showErrorMessages(isValidEmail, isValidPassword);
        }
    });

    function validateEmail(email) {
        // Add your email validation logic here
        // For simplicity, let's check if it contains '@'
        return email.includes('@');
    }

    function validatePassword(password) {
        // Check if the password has at least 6 characters
        return password.length >= 6;
    }

    function showErrorMessages(isValidEmail, isValidPassword) {
        const emailErrorMessage = document.getElementById('email-error-message');
        const passwordErrorMessage = document.getElementById('password-error-message');

        if (!isValidEmail) {
            emailErrorMessage.style.display = 'block';
        } else {
            emailErrorMessage.style.display = 'none';
        }

        if (!isValidPassword) {
            passwordErrorMessage.style.display = 'block';
        } else {
            passwordErrorMessage.style.display = 'none';
        }
    }
});
