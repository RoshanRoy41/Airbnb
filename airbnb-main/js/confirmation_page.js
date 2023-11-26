// Import the Lottie player library
// import 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
console.log("import work?");
document.addEventListener("DOMContentLoaded", () => {
  // Function to get URL parameters by name
  function getUrlParameter(name) {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null
      ? null
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  // Get check-in and check-out dates from URL
  const checkin = getUrlParameter("chkin");
  const checkout = getUrlParameter("chkout");
  console.log("Check-in from URL:", checkin);
  console.log("Check-out from URL:", checkout);
  // Update the HTML content with the retrieved dates
  const checkinElement = document.querySelector(".card-text.checkin");
  const checkoutElement = document.querySelector(".card-text.checkout");
  console.log("Check-in Element:", checkinElement);
  console.log("Check-out Element:", checkoutElement);
  if (checkinElement && checkoutElement && checkin && checkout) {
    console.log("Updating HTML content...");
    checkinElement.textContent = `Check-in: ${checkin}`;
    checkoutElement.textContent = `Check-out: ${checkout}`;
  } else {
    console.log("Some elements or parameters are missing.");
  }
  console.log("hi");
});
