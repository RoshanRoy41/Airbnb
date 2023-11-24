let imgData = fetch("https://mocki.io/v1/a333851f-8d2f-473c-bd8e-7c3b1a39e8c8");
let images = [];
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");
let rand = userId;
let reviewNum = Math.floor(Math.random() * 1000);
imgData
  .then((response) => response.json())
  .then((data) => {
    images = data;
    console.log(images);
    // Ensure that rand is initialized appropriately (e.g., rand = 0)

    console.log(images[rand].rating);
    document.getElementById("rating").textContent =
      images[rand].rating.toFixed(2);
    document.getElementById("rating two").textContent =
      "   " + images[rand].rating.toFixed(2);
    document.getElementById("star").textContent =
      "   " + images[rand].rating.toFixed(2);
    document.getElementById("maxguests").textContent =
      "   " + images[rand].guests + " Guests | ";
    document.getElementById("noOfBeds").textContent =
      "   " + images[rand].beds + " Beds | ";
    document.getElementById("noOfRooms").textContent =
      "   " + images[rand].bedrooms + " Rooms | ";
    document.getElementById("noOfBath").textContent =
      "   " + images[rand].bathrooms + " Baths ";
    // Set src attributes for image elements
    document.getElementById("title1").innerHTML = images[rand].name;
    document.getElementById("locationOfUnit").textContent =
      "\u00A0 \u00A0" + images[rand++].location;
    document.getElementById("img1").src = images[rand++].download_url;
    document.getElementById("img2").src = images[rand++].download_url;
    document.getElementById("img3").src = images[rand++].download_url;
    document.getElementById("img4").src = images[rand++].download_url;
    document.getElementById("img5").src = images[rand].download_url;
    // Set author names
    // document.getElementById("rating").textContent =
    //   "   " + images[rand].rating.toFixed(2);
    // console.log(images[rand].rating.toFixed(2));

    document.getElementById("author").textContent = images[rand].author_name;
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

//number of reviews
document.getElementById("reviewsNum").textContent = reviewNum + " ";
document.getElementById("reviewsNum two").textContent =
  " " + reviewNum + " Reviews";
document.getElementById("review").textContent = " " + reviewNum + " Reviews";
const getName = fetch(`https://jsonplaceholder.typicode.com/todos/${rand}`);

//getiing random name for Unit
getName
  .then((response) => response.json())
  .then((data) => (document.getElementById("title").textContent = data.title));

// const getCountry = fetch("https://api.apipip.com/v1/random-country/");
// getCountry
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("Name:", data.name);
//   })
//   .catch((error) => console.log("Error:", error));

let dataUrl = "https://dummyjson.com/users";

let getTextData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const showData = document.querySelector(".reviewsTexts");

    if (data.users && data.users.length > 0) {
      let startingNumber = Math.floor(Math.random() * 25);
      document.getElementById("imgHost").src = data.users[startingNumber].image;

      for (
        let i = startingNumber;
        i < startingNumber + 4 && i < data.users.length;
        i++
      ) {
        const userData = data.users[i];
        const oneReview = createReviewCard(userData);
        showData.appendChild(oneReview);
      }
    } else {
      console.error("Invalid data structure: users array is missing or empty");
      // You can add fallback behavior or display a message to the user
    }
  } catch (e) {
    console.log(e);
  }
};

getTextData(dataUrl);

const createReviewCard = (userData) => {
  const oneReview = document.createElement("div");
  oneReview.classList.add("oneReview");

  const oneReviewName = document.createElement("h3");
  oneReviewName.classList.add("oneReview-Name");
  const oneReviewRating = document.createElement("h3");
  oneReviewName.classList.add("oneReview-Rating");

  const oneReviewPara = document.createElement("p");
  oneReviewPara.setAttribute("id", "oneReviewPara");

  oneReviewName.textContent =
    userData.firstName +
    "  " +
    userData.lastName +
    " | " +
    (1 + Math.random() * 4).toFixed(2);
  oneReviewPara.textContent =
    "Lorem ipsum  quis nostrud exercitation . Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  // oneReviewRating.textContent = " | " + (1 + Math.random() * 4).toFixed(2);

  oneReview.appendChild(oneReviewName);
  // oneReview.appendChild(oneReviewRating);
  oneReview.appendChild(oneReviewPara);

  return oneReview;
};
