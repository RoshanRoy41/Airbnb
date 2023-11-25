const dateParams = new URLSearchParams(window.location.search);
const checkInDate = dateParams.get("chkin");
const checkOutDate = dateParams.get("chkout");
let checkInDateElement = document.getElementById("chkin-day");
checkInDateElement.textContent = checkInDate;
let checkOutDateElement = document.getElementById("chkout-day");
checkOutDateElement.textContent = checkOutDate;
