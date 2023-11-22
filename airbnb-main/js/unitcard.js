document.addEventListener("DOMContentLoaded", function () {
  // Get the location information from the third section's <p> tag
  let locationElement = document.getElementById("location");
  let locationText = locationElement
    .querySelector("p")
    .innerText.trim()
    .toLowerCase();

  // Define a mapping of locations to coordinates (replace with your own locations)
  let locationMappings = {
    "london, united kingdom": { lat: 51.505, lng: -0.09 },
    "paris, france": { lat: 48.8566, lng: 2.3522 },
    // Add more locations as needed
  };
  

  // Check if the specified location exists in the mapping
  if (locationMappings.hasOwnProperty(locationText)) {
    let locationCoordinates = locationMappings[locationText];

    // Initialize the map with the specified coordinates
    let map = L.map("map").setView(
      [locationCoordinates.lat, locationCoordinates.lng],
      13
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Add a marker for the specified location
    L.marker([locationCoordinates.lat, locationCoordinates.lng])
      .addTo(map)
      .bindPopup(locationText)
      .openPopup();
  } else {
    console.error("Location not found in the mapping.");
  }
});


