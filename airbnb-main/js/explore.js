const apiKey = "5ae2e3f221c38a28845f05b66bd1d0f72739e54291361135e77c3a3b";
const mapParams = new URLSearchParams(window.location.search);
const latitude = mapParams.get("lat");
const longitude = mapParams.get("long");
// Fetch random places in London from OpenTripMap API
async function fetchPlaces() {
  try {
    const radius = 500; // You can adjust the radius as needed (in kilometers)

    const response = await fetch(
      `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lat=${latitude}&lon=${longitude}&kinds=interesting_places&format=json&apikey=${apiKey}`
    );

    const data = await response.json();
    console.log("API Response:", data);

    const placesContainer = document.getElementById("places-container");

    // Check if features array exists and is not empty
    if (data && Array.isArray(data) && data.length > 0) {
      // Select 9 random places
      const randomPlaces = getRandomElements(data, 9);

      // Create a grid
      for (let i = 0; i < 9; i++) {
        const place = randomPlaces[i];

        if (place) {
          const placeDiv = document.createElement("div");
          placeDiv.classList.add("place");
          placeDiv.setAttribute("data-lat", place.point.lat);
          placeDiv.setAttribute("data-lon", place.point.lon);
          placeDiv.onclick = () => openMapPage(place);

          // Create a paragraph for the place name (in bold)
          const nameParagraph = document.createElement("p");
          nameParagraph.classList.add("bold-text");
          nameParagraph.textContent = place.name;
          placeDiv.appendChild(nameParagraph);

          // Create a paragraph for "Holiday Rentals"
          const rentalsParagraph = document.createElement("p");
          rentalsParagraph.textContent = "Holiday Rentals";
          placeDiv.appendChild(rentalsParagraph);

          // Append the placeDiv to the placesContainer
          placesContainer.appendChild(placeDiv);
        }
      }
    } else {
      console.error("No features found in the response.");
    }
  } catch (error) {
    console.error("Error fetching places:", error);
  }
}

// Call the async function
fetchPlaces();

// Function to get random elements from an array
function getRandomElements(array, num) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

// Function to open a new HTML page with a map pointing to the location
function openMapPage(place) {
  const { lat, lon } = place.point;
  window.location.href = `map.html?lat=${lat}&lon=${lon}`;
}
