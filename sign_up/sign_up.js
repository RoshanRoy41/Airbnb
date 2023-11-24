document.addEventListener("DOMContentLoaded", function () {
    const signUpForm = document.querySelector('.login-form');

    signUpForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Remove existing error messages
        removeErrorMessages();

        // Get form input values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const dob = document.getElementById('dob').value;
        const profession = document.getElementById('profession').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate all fields are entered
        if (!name || !email || !dob || !profession || !password || !confirmPassword) {
            displayErrorMessage('All fields are required.', 'name');
            return;
        }

        // Validate password length
        if (password.length < 7) {
            displayErrorMessage('Password must be at least 7 characters.', 'password');
            return;
        }

        // Validate password and confirm password match
        if (password !== confirmPassword) {
            displayErrorMessage('Password and Confirm Password do not match.', 'confirmPassword');
            return;
        }

        // If all validations pass, you can proceed with further actions (e.g., form submission)
        // alert('Sign-up successful!'); // Uncomment this line if you want to show an alert
        // Here you can add code to submit the form or perform other actions
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
                window.location.reload(); // Reload the page immediately
            })
            .catch((error) => {
                console.error("Error!", error.message);
                // Handle error appropriately (e.g., display an error message to the user)
            });
    }
});
