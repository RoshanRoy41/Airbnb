$(document).ready(function () {
  const nightsTitle = document.querySelector(".nights-title");
  const selectedDatesParagraph = document.getElementById("selectedDates");

  // Initialize Flatpickr for date picking
  flatpickr("#calendar-container", {
    mode: "range",
    inline: true,
    dateFormat: "Y-m-d",
    showMonths: 2, // Display two months
    minDate: "today", // Set minimum date to today
    onChange: function (selectedDates, dateStr, instance) {
      const numberOfNights =
        instance.selectedDates.length > 1
          ? (instance.selectedDates[1] - instance.selectedDates[0]) /
            (1000 * 60 * 60 * 24)
          : 0;

      nightsTitle.textContent = `${numberOfNights} nights in Great London`;
      selectedDatesParagraph.textContent = ` ${dateStr}`;
    },
  });
});
