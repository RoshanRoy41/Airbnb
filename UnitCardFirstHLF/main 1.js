document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

function fetchData() {
  fetch(
    "https://api.slingacademy.com/v1/sample-data/photos?offset=0&limit=100"
  )
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector(".scroll");

      for (let i = 0; i < data.photos.length; i += 5) {
        const cardData = data.photos.slice(i, i + 5);
        const card = createCard(cardData);
        container.appendChild(card);
      }
    })
    .catch((error) => console.log(error));
}

function createCard(data) {
  const card = document.createElement("div");
  card.classList.add("card");

  const carouselContainer = document.createElement("div");
  carouselContainer.classList.add("carousel-container");

  for (let i = 0; i < data.length; i++) {
    const img = document.createElement("img");
    img.src = data[i].url;
    carouselContainer.appendChild(img);
  }

  const prevButton = createButton("left");
  const nextButton = createButton("right");

  card.appendChild(carouselContainer);
  card.appendChild(prevButton);
  card.appendChild(nextButton);

  return card;
}

function createButton(direction) {
  const button = document.createElement("button");
  button.textContent = direction === "left" ? "←" : "→";
  button.addEventListener("click", () => navigateCarousel(button, direction));
  return button;
}

function navigateCarousel(button, direction) {
  const card = button.parentNode;
  const carousel = card.querySelector(".carousel-container");
  const currentScroll = carousel.scrollLeft;
  const cardWidth = card.offsetWidth;

  carousel.scrollTo({
    left: currentScroll + direction * cardWidth,
    behavior: "smooth",
  });
}
function navigateCarousel(button, direction) {
  const card = button.parentNode;
  const carousel = card.querySelector(".carousel-container");
  const currentScroll = carousel.scrollLeft;
  const cardWidth = card.offsetWidth;

  const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

  carousel.scrollTo({
    left: currentScroll + scrollAmount,
    behavior: "smooth",
  });
}
