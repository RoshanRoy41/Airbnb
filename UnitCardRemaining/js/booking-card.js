$(document).ready(function () {
  $("#txtCheckin").datepicker({
    dateFormat: "dd-M-yy",
    onSelect: function (date) {
      var date2 = $("#txtCheckin").datepicker("getDate");
      date2.setDate(date2.getDate());
      $("#txtCheckout").datepicker("setDate", date2);
      //sets minDate to dateofbirth date + 1
      $("#txtCheckout").datepicker("option", "minDate", date2);
    },
  });
  $("#txtCheckout").datepicker({
    dateFormat: "dd-M-yy",
    onClose: function () {
      var dt1 = $("#txtCheckin").datepicker("getDate");
      console.log(dt1);
      var dt2 = $("#txtCheckout").datepicker("getDate");
      if (dt2 <= dt1) {
        var minDate = $("#txtCheckout").datepicker("option", "minDate");
        $("#txtCheckout").datepicker("setDate", minDate);
      }
    },
  });
});
document.addEventListener("DOMContentLoaded", function () {
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
});

$(document).ready(function () {
  // Function to open the date picker for Check-In or Check-Out when dates are not set
  function openDatePickerIfDatesNotSet() {
    const checkinDate = $("#txtCheckin").datepicker("getDate");
    const checkoutDate = $("#txtCheckout").datepicker("getDate");

    if (!checkinDate || !checkoutDate) {
      $("#txtCheckin").datepicker("show");
    }
  }

  // Add an event listener to the "Check Availability" button
  const checkAvailabilityButton = document.querySelector(".ChkBtn");
  let reserveNowClicked = false;

  checkAvailabilityButton.addEventListener("click", function () {
    openDatePickerIfDatesNotSet();
    checkAndDisplayAvailability();
  });

  // Function to check and display availability
  function checkAndDisplayAvailability() {
    const checkinDate = $("#txtCheckin").datepicker("getDate");
    const checkoutDate = $("#txtCheckout").datepicker("getDate");

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
      if (!reserveNowClicked) {
        // Change the text to "Reserve now" on the first click
        checkAvailabilityButton.textContent = "Reserve now";
        reserveNowClicked = true;
      } else {
        // Redirect to a new HTML page on the second click
        window.location.href =
          "/UnitCardRemaining/tem_pages/confirmation_page.html";
      }
    }
  }
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
});
// Add an event listener to check the scroll position
document.addEventListener("scroll", function () {
  // Get the position of the hr tag
  var hrPosition = document.getElementById("bookingContainerStop").offsetTop;

  // Get the booking container element
  var bookingContainer = document.querySelector(".booking-container");

  // Check if the scroll position is above the hr tag
  if (window.pageYOffset < hrPosition) {
    bookingContainer.style.position = "fixed";
    bookingContainer.style.top = "20px"; // Adjust this value as needed
  } else {
    bookingContainer.style.position = "static";
  }
});
