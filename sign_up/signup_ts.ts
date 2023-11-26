document.addEventListener("DOMContentLoaded", function () {
    const signUpForm = document.querySelector('.login-form') as HTMLFormElement;

    signUpForm.addEventListener('submit', function (event) {
        event.preventDefault();

       
        removeErrorMessages();

     
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const dob = (document.getElementById('dob') as HTMLInputElement).value;
        const profession = (document.getElementById('profession') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;

   
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

    function displayErrorMessage(message: string, fieldId: string) {
        const errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        errorElement.innerText = message;

        const field = document.getElementById(fieldId) as HTMLElement;
        field.parentElement?.appendChild(errorElement);
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
