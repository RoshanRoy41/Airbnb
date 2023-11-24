$(document).ready(function () {
  const nightsTitle = document.querySelector(".nights-title");
  const selectedDatesParagraph = document.getElementById("selectedDates");
  const locationCalendarParams = new URLSearchParams(window.location.search);
  const locationCalName = locationCalendarParams.get("place");
  nightsTitle.textContent = `0 nights in ${locationCalName}`;

  // Initialize Flatpickr for date picking on the left calendar
  const leftCalendar = flatpickr("#calendar-container", {
    mode: "range",
    inline: true,
    dateFormat: "Y-m-d",
    showMonths: 2,
    minDate: "today",
    onChange: function (selectedDates, dateStr, instance) {
      updateBookingDetails(selectedDates);
      updateBookingCalendars(selectedDates);
    },
  });

  // Initialize Flatpickr for check-in and check-out in the booking container
  const checkinCheckoutCalendar = flatpickr("#txtCheckin, #txtCheckout", {
    mode: "range",
    dateFormat: "Y-m-d",
    minDate: "today",
    onClose: function (selectedDates) {
      updateBookingDetails(selectedDates);
      leftCalendar.setDate(selectedDates[0], selectedDates[1]);
    },
  });

  // Placeholder IDs for Check-In and Check-Out calendars
  const chkinCalendar = flatpickr("#txtCheckin", {
    dateFormat: "Y-m-d",
    // Other options...
  });

  const chkoutCalendar = flatpickr("#txtCheckout", {
    dateFormat: "Y-m-d",
    // Other options...
  });

  function updateBookingDetails(selectedDates) {
    const numberOfNights =
      selectedDates.length > 1
        ? (selectedDates[1] - selectedDates[0]) / (1000 * 60 * 60 * 24)
        : 0;

    nightsTitle.textContent = `${numberOfNights} nights in ${locationCalName}`;
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
