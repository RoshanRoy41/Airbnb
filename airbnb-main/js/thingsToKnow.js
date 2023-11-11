document.addEventListener("DOMContentLoaded", () => {
  fetchDataAndCreateSections();
});

async function fetchDataAndCreateSections() {
  const container = document.querySelector(".rules-container");

  try {
    const [productsResponse, photosResponse] = await Promise.all([
      fetch(
        "https://api.slingacademy.com/v1/sample-data/products?offset=0&limit=100"
      ),
      fetch(
        "https://api.slingacademy.com/v1/sample-data/photos?offset=0&limit=100"
      ),
    ]);

    const [productsData, photosData] = await Promise.all([
      productsResponse.json(),
      photosResponse.json(),
    ]);

    createSection("House Rules", container, productsData.products);
    createSection("Safety & Property", container, productsData.products);
    createSection("Cancellation Policy", container, photosData.photos);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function createSection(title, container, data) {
  const ruleSection = document.createElement("div");
  ruleSection.classList.add("rule-section");

  const sectionTitle = document.createElement("h2");
  sectionTitle.textContent = title;

  const showMoreLink = document.createElement("a");
  showMoreLink.textContent = "Show more ►";
  showMoreLink.href = "#"; // You can set the actual link if needed

  ruleSection.appendChild(sectionTitle);

  if (title === "House Rules" || title === "Safety & Property") {
    const randomIndex = Math.floor(Math.random() * data.length);
    const name = data[randomIndex].name;
    const category = data[randomIndex].category;
    const description = data[randomIndex].description;

    const ruleContent = document.createElement("div");
    ruleContent.innerHTML = `<p>${name}</p><p>${category}</p><p>${description}</p>`;
    ruleSection.appendChild(ruleContent);
  } else if (title === "Cancellation Policy") {
    const randomIndex = Math.floor(Math.random() * data.length);
    const photoTitle = data[randomIndex].title;
    const photoDescription = data[randomIndex].description;

    const ruleContent = document.createElement("div");
    ruleContent.innerHTML = `<p>${photoTitle}</p><p>${photoDescription}</p>`;
    ruleSection.appendChild(ruleContent);
  }

  ruleSection.appendChild(showMoreLink);
  container.appendChild(ruleSection);
}
