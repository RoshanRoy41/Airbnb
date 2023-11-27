function validateContactForm() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return false;
  }
}

const scriptURL = "https://script.google.com/macros/s/AKfycbzS1ecgtpFdbfUEXYctJa2lUbfWIMLKj-p1wgwojSBCzwG1kkSuVgdBHC6XkkHGX9yg/exec";
const form = document.forms["contact-form"];

form.addEventListener("submit", (e) => {
e.preventDefault();

fetch(scriptURL, { method: "POST", body: new FormData(form) })
  .then((response) => response.json())
  .then((data) => {
    alert("Thank you! Your form is submitted successfully.");
    window.location.reload(); 
  })
  .catch((error) => {
    console.error("Error!", error.message);
   
  });
});
