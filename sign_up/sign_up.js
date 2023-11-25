document.addEventListener("DOMContentLoaded", function () {
    const signUpForm = document.querySelector('.login-form');

    signUpForm.addEventListener('submit', function (event) {
        event.preventDefault();

       
        removeErrorMessages();

     
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const dob = document.getElementById('dob').value;
        const profession = document.getElementById('profession').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        
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
        const errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        errorElement.innerText = message;

        const field = document.getElementById(fieldId);
        field.parentElement.appendChild(errorElement);
    }

    function removeErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());
    }

    function submitForm() {
        const scriptURL = "https://script.google.com/macros/s/AKfycbyMR2j8nCu9_lUVc2KMs66_MmiH7DgCrHifoWDjXRgFCEB6Jw39SZxS8E_pT6E2pwii1Q/exec";
        const formData = new FormData(signUpForm);

        fetch(scriptURL, { method: "POST", body: formData })
            .then((response) => response.json())
            .then((data) => {
                alert("Sign up is successfully completed.");
                window.location.reload(); 
            })
            .catch((error) => {
                console.error("Error!", error.message);
                
            });
    }
});
