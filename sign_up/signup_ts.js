document.addEventListener("DOMContentLoaded", function () {
    var signUpForm = document.querySelector('.login-form');
    signUpForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        removeErrorMessages();
     
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var dob = document.getElementById('dob').value;
        var profession = document.getElementById('profession').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;
      
        if (!name || !email || !dob || !profession || !password || !confirmPassword) {
            displayErrorMessage('All fields are required.', 'name');
            return;
        }
     
        if (password.length < 7) {
            displayErrorMessage('Password must be at least 7 characters.', 'password');
            return;
        }
       
        if (password !== confirmPassword) {
            displayErrorMessage('Password and Confirm Password do not match.', 'confirmPassword');
            return;
        }
       
        submitForm();
    });
    function displayErrorMessage(message, fieldId) {
        var _a;
        var errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        errorElement.innerText = message;
        var field = document.getElementById(fieldId);
        (_a = field.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(errorElement);
    }
    function removeErrorMessages() {
        var errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function (message) { return message.remove(); });
    }
    function submitForm() {
        var scriptURL = "https://script.google.com/macros/s/AKfycbyMR2j8nCu9_lUVc2KMs66_MmiH7DgCrHifoWDjXRgFCEB6Jw39SZxS8E_pT6E2pwii1Q/exec";
        var formData = new FormData(signUpForm);
        fetch(scriptURL, { method: "POST", body: formData })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            alert("Sign up is successfully completed.");
            window.location.reload(); 
        })
            .catch(function (error) {
            console.error("Error!", error.message);
            
        });
    }
});
