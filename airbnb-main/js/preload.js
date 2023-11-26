document.addEventListener('DOMContentLoaded', function () {
  const timeLimit = 2500;
  const preloader = document.getElementById('preloader');

  // Show the preloader
  preloader.style.display = 'block';

  // Set a timeout to hide the preloader after the specified time limit
  setTimeout(function () {
      // Add the 'fade' class to trigger the fade effect
      preloader.classList.add('fade');

      // Set another timeout to hide the preloader after the transition duration
      setTimeout(function () {
          preloader.style.display = 'none';
      }, 1000); // Assuming the transition duration is 1000ms
  }, timeLimit);
});
