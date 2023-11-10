$(document).ready(function () {
  const nightsTitle = document.querySelector(".nights-title");
  const selectedDatesParagraph = document.getElementById("selectedDates");

  // Initialize Flatpickr for date picking on the left calendar
  const leftCalendar = flatpickr("#calendar-container", {
    mode: "range",
    inline: true,
    dateFormat: "Y-m-d",
    showMonths: 2, // Display two months
    minDate: "today", // Set minimum date to today
    onChange: function (selectedDates, dateStr, instance) {
      // Update the text content of the nights title and selected dates paragraph
      updateBookingDetails(selectedDates);

      // Update the check-in and check-out calendars in the booking container
      updateBookingCalendars(selectedDates);
    },
  });

  // Initialize Flatpickr for check-in and check-out in the booking container
  const checkinCheckoutCalendar = flatpickr("#txtCheckin, #txtCheckout", {
    mode: "range",
    dateFormat: "Y-m-d",
    minDate: "today",
    onClose: function (selectedDates) {
      // Update the text content of the nights title and selected dates paragraph
      updateBookingDetails(selectedDates);

      // Update the left calendar
      leftCalendar.setDate(selectedDates[0], selectedDates[1]);
    },
  });

  function updateBookingDetails(selectedDates) {
    const numberOfNights =
      selectedDates.length > 1
        ? (selectedDates[1] - selectedDates[0]) / (1000 * 60 * 60 * 24)
        : 0;

    nightsTitle.textContent = `${numberOfNights} nights in Great London`;
    selectedDatesParagraph.textContent = ` ${selectedDates
      .map((date) => date.toLocaleDateString())
      .join(" - ")}`;
  }

  function updateBookingCalendars(selectedDates) {
    if (selectedDates.length > 1) {
      chkinCalendar.setDate(selectedDates[0]);
      chkoutCalendar.setDate(selectedDates[1]);
    }
  }
});
