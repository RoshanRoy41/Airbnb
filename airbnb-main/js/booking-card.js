document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const userPrice = urlParams.get("price");

  let priceElement = document.getElementById("rate");

  if (priceElement) {
    priceElement.textContent = "₹" + userPrice;
  } else {
    console.error("Element with ID 'rate' not found");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Flatpickr for Check-In and Check-Out input fields
  flatpickr("#txtCheckin", {
    dateFormat: "d-m-Y",
  });

  flatpickr("#txtCheckout", {
    dateFormat: "d-m-Y",
  });

  const incrementButton = document.getElementById("incrementButton");
  const decrementButton = document.getElementById("decrementButton");
  const guestCount = document.querySelector(".textGuest p");

  incrementButton.addEventListener("click", function () {
    let currentCount = parseInt(guestCount.textContent);
    if (currentCount < 1) {
      currentCount = 1;
    } else {
      currentCount++;
    }
    guestCount.textContent = currentCount;
  });

  decrementButton.addEventListener("click", function () {
    let currentCount = parseInt(guestCount.textContent);
    if (currentCount > 1) {
      currentCount--;
      guestCount.textContent = currentCount;
    }
  });

  // Function to open the date picker for Check-In or Check-Out when dates are not set
  function openDatePickerIfDatesNotSet() {
    const checkinDate = flatpickr("#txtCheckin").selectedDates[0];
    const checkoutDate = flatpickr("#txtCheckout").selectedDates[0];

    if (!checkinDate || !checkoutDate) {
      flatpickr("#txtCheckin").open();
    }
  }

  // Add an event listener to the "Check Availability" button
  const checkAvailabilityButton = document.querySelector(".ChkBtn");
  let reserveNowClicked = false;

  checkAvailabilityButton.addEventListener("click", function () {
    openDatePickerIfDatesNotSet();
    checkAndDisplayAvailability();
  });

  let totalPrice;
  // Function to create a new booking card with availability details
  function createNewBookingCard(checkinDate, checkoutDate) {
    // Calculate the number of days between check-in and check-out
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const checkinTime = checkinDate.getTime();
    const checkoutTime = checkoutDate.getTime();
    const numberOfDays = Math.round(
      Math.abs((checkoutTime - checkinTime) / oneDay)
    );

    // Get the price per night from the element with ID "rate"
    const rateElement = document.getElementById("rate");
    const pricePerNight = parseFloat(rateElement.textContent.replace("₹", "")); // Extract and parse the numeric value

    // Calculate the total price
    const guestCount = parseInt(
      document.querySelector(".textGuest p").textContent
    );
    // 10% increase if guestCount > 1, else 0% increase
    const rateIncreasePercentage = guestCount > 1 ? 0.1 : 0;

    totalPrice = Math.trunc(
      pricePerNight * numberOfDays * (1 + rateIncreasePercentage)
    );

    // Create a new card
    const newCard = document.createElement("div");
    newCard.classList.add("booking-card");

    // Create a div to display the final product
    const finalProductDiv = document.createElement("div");
    finalProductDiv.classList.add("final-product");
    updateFinalProduct(finalProductDiv, totalPrice);

    newCard.innerHTML = `
      <!-- Your new card content here -->
      <div class="centered-text">You won't be charged yet</div>
      <div class="price-info">₹${pricePerNight} per night x ${numberOfDays} nights</div>
    `;

    newCard.appendChild(finalProductDiv);

    return newCard;
  }

  function updateFinalProduct(element, numberOfDays) {
    element.textContent = `Total: ₹${totalPrice}`;
  }

  // Function to check and display availability
  function checkAndDisplayAvailability() {
    const checkinDate = flatpickr("#txtCheckin").selectedDates[0];
    const checkoutDate = flatpickr("#txtCheckout").selectedDates[0];
    // const totalPrice = document.querySelector(".final-product").innerHTML;

    if (checkinDate && checkoutDate) {
      // Fetch availability and create the new booking card
      const newBookingCard = createNewBookingCard(checkinDate, checkoutDate);
      const newBookingCardContainer =
        document.querySelector(".new-booking-card");

      // Clear any existing new cards
      newBookingCardContainer.innerHTML = "";

      // Append the new card to the booking container and display it
      newBookingCardContainer.appendChild(newBookingCard);
      newBookingCardContainer.style.display = "block";
      checkAvailabilityButton.textContent = "Reserve now";
      checkAvailabilityButton.className = "reservenow";

      if (!reserveNowClicked) {
        // Change the text to "Reserve now" on the first click
        checkAvailabilityButton.textContent = "Reserve now";
        const button = document.querySelector(".reservenow");
        const urlParams = new URLSearchParams(window.location.search);
        let stayingPlace = urlParams.get("place");
        const unitId = urlParams.get("id");
        let dataURL = fetch("http://localhost:3001/api");
        let dataArray = [];
        let hotelName;
        dataURL
          .then((response) => response.json())
          .then((data) => {
            dataArray = data;
            hotelName = dataArray[unitId].name;
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });

        button.addEventListener("click", async () => {
          try {
            console.log(totalPrice);
            const response = await fetch(
              "http://localhost:3000/create-checkout-session",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  dates: [
                    {
                      checkinDate: checkinDate.toISOString().split("T")[0],
                      checkoutDate: checkoutDate.toISOString().split("T")[0],
                    },
                  ],
                  totalPrice: totalPrice,
                  place: " " + hotelName + " " + stayingPlace,
                }),
              }
            );

            if (response.ok) {
              const { url } = await response.json();
              window.location.href = url;
            } else {
              const { error } = await response.json();
              console.error("Error:", error);
            }
          } catch (error) {
            console.error("Error:", error.message);
          }
        });
        // reserveNowClicked = true;
      }
    }
  }
});

// Add an event listener to check the scroll position
document.addEventListener("scroll", function () {
  // Get the position of the hr tag
  let hrPosition = document.getElementById("bookingContainerStop").offsetTop;

  // Get the booking container element
  let bookingContainer = document.querySelector(".booking-container");

  // Check if the scroll position is above the hr tag
  if (window.scrollY < hrPosition) {
    bookingContainer.style.position = "sticky";
    bookingContainer.style.top = "20px"; // Adjust this value as needed
  } else {
    bookingContainer.style.position = "static";
  }
});
