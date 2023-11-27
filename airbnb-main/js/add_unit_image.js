var loader = document.getElementById('loader');
    var mainContent = document.getElementById('main');

    function loadNow(opacity) {
      if (opacity <= 0) {
        displayContent();
      } else {
        loader.style.opacity = opacity;
        window.setTimeout(function () {
          loadNow(opacity - 0.01);
        }, 100);
      }
    }

    function displayContent() {
      loader.style.display = 'none';
      mainContent.style.display = 'block';
    }

    document.addEventListener("DOMContentLoaded", function () {
      document.body.style.backgroundColor = 'white'; // Set the initial background color to white
      mainContent.style.visibility = 'hidden'; // Hide the content initially

      // Simulate content loading for 6 seconds
      setTimeout(function () {
        loadNow(1);
        mainContent.style.visibility = 'visible'; // Make content visible after loading
      }, 6000);
    });



// function validateContactForm() {
//   var title = document.getElementById('title').value;
//   var hostname = document.getElementById('hostname').value;
//   var guests = document.getElementById('guests').value;
//   var halls = document.getElementById('halls').value;
//   var bedrooms = document.getElementById('bedrooms').value;
//   var bathrooms = document.getElementById('bathrooms').value;
//   var kitchen = document.getElementById('kitchen').value;
//   var address = document.getElementById('address').value;
//   var city = document.getElementById('city').value;
//   var country = document.getElementById('country').value;
//   var zip = document.getElementById('zip').value;
//   var amenities = document.getElementById('amenities').value;
//   var pricing_option = document.getElementById('pricing_option').value;
//   var additional_pricing = document.getElementById('additional_pricing').value;
//   var fixed_rent = document.getElementById('fixed_rent').value;
  
//   if (!title || !hostname || !guests || !halls || !bedrooms || !bathrooms || !kitchen || !address || !city
//     || !country || !zip || !amenities || !pricing_option || !additional_pricing || !fixed_rent) {
//     alert('Please fill in all fields.');
//     return false;
//   }
// // }
// function validateContactForm() {
//   var title = document.getElementById('title').value;
//   var hostname = document.getElementById('hostname').value;
//   var guests = document.getElementById('guests').value;

//   if (!title || !hostname || !guests) {
//     alert('Please fill in all fields.');
//     return false;
//   }
// }

// const scriptURL = "https://script.google.com/macros/s/AKfycbxaKG4n3Ubky3do1m6qx2tPHGUHxN8RN2i4nla9KFDCuNCnIajDU0CVmx4Qzjsm2Cz1Uw/exec";
// const form = document.forms["form_container"];

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   if (validateContactForm()) {
//     fetch(scriptURL, { method: "POST", body: new FormData(form) })
//       .then((response) => response.json())
//       .then((data) => {
//         alert("Thank you! Your form is submitted successfully.");
//         window.location.href = window.location.href; // Reload the page// Reload the page immediately
//       })
//       .catch((error) => {
//         console.error("Error!", error.message);
//         // Handle error appropriately (e.g., display an error message to the user)
//       });
//   }
// });
// Add this function to show the map
function initializeMap() {
  // Show the map container
  document.getElementById("map").classList.remove("visually-hidden");

  // Initialize the map using Leaflet.js (an open-source JavaScript library)
  const map = L.map('map').setView([0, 0], 2);

  // Add OpenStreetMap as the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add a marker on map click
  const marker = L.marker([0, 0], { draggable: true }).addTo(map);

  // Listen for marker dragend event
  marker.on('dragend', function(event) {
    const { lat, lng } = event.target.getLatLng();
    // Update your form inputs with the new marker position
    document.getElementById('address').value = `${lat}, ${lng}`;
  });
}

