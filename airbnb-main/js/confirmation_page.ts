// Import the Lottie player library
import 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';


document.addEventListener('DOMContentLoaded', () => {
    // Function to get URL parameters by name
    function getUrlParameter(name: string): string | null {
      name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
      const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      const results = regex.exec(location.search);
      return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
  
    // Get check-in and check-out dates from URL
    const checkin = getUrlParameter('checkin');
    const checkout = getUrlParameter('checkout');
  
    // Update the HTML content with the retrieved dates
    const checkinElement = document.querySelector('.card-text.checkin');
    const checkoutElement = document.querySelector('.card-text.checkout');
  
    if (checkinElement && checkoutElement && checkin && checkout) {
      checkinElement.textContent = `Check-in: ${checkin}`;
      checkoutElement.textContent = `Check-out: ${checkout}`;
    }
  });
  