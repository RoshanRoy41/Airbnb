const url = "http://localhost:3001/api";

const subCContainer = document.querySelector(".sub-container");
const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search-button");
const closeButton = document.querySelector(".close-button");
subCContainer.style.display = "none";

const buttonClick = (event) => {
  subCContainer.style.display = "block";
  event.preventDefault();
};

searchButton.addEventListener("click", buttonClick);
const closeClick = (event) => {
  subCContainer.style.display = "none";
  event.preventDefault();
};
closeButton.addEventListener("click", closeClick);

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const imageCard = document.getElementById("listings"); // Define imageCard here

    const filteredData = data.filter((userData, index) => index % 5 === 0);

    filteredData.forEach((userData) => {
      const cardData = createCardData(userData, imageCard); // Pass imageCard as a parameter
      imageCard.appendChild(cardData);
    });
  } catch (e) {
    console.log(e);
  }
};

getData(url);

const createCardData = (userData, imageCard) => {
  // Add imageCard as a parameter
  const div = document.createElement("div");
  div.classList.add("card");

  const img = document.createElement("img");

  const div1 = document.createElement("div");
  div1.classList.add("wishlist-icon");
  div1.innerHTML = "<i class='fas fa-heart'></i>";
  img.src = userData.download_url;

  const div2 = document.createElement("div");

  const div3 = document.createElement("div");
  div3.classList.add("card-title");
  const h4 = document.createElement("h4");
  const p = document.createElement("p");
  h4.textContent = userData.name;
  let num = userData.rating + " <i class='fa-solid fa-star'></i>";
  p.innerHTML = num;

  const p1 = document.createElement("p");
  const span = document.createElement("span");
  span.classList.add("grey");
  span.innerHTML = "Hosted by " + userData.author_name;

  let distance = (Math.random() * 30 + 1).toFixed(2);
  const p3 = document.createElement("p");
  const span1 = document.createElement("span");
  span1.classList.add("grey");
  span1.innerHTML = distance + " km to National Park";

  const p2 = document.createElement("p");
  let num1 = userData.width;
  p2.innerHTML = "₹" + num1 + " night";

  div.appendChild(img);
  div.appendChild(div1);
  div3.appendChild(h4);
  div3.appendChild(p);
  div2.appendChild(div3);
  p1.appendChild(span);
  div2.appendChild(p1);
  p3.appendChild(span1);
  div2.appendChild(p3);
  div2.appendChild(p2);
  div.appendChild(div2);
  imageCard.appendChild(div);

  div.addEventListener("click", () => {
    openNewPage(userData);
    console.log("hello event");
    console.log(userData.id);
  });
  return div;
};

const openNewPage = (userData) => {
  window.location.href = `unitcard.html?id=${userData.id}&price=${userData.width}&lat=${userData.latitude}&long=${userData.longitude}&place=${userData.location}`;
};
