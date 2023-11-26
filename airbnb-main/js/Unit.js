let dataURL = fetch("https://mocki.io/v1/a333851f-8d2f-473c-bd8e-7c3b1a39e8c8");
let dataset = [];
const urlParams = new URLSearchParams(window.location.search);
const unitId = urlParams.get("id");
let rand = unitId;
let reviewNum = Math.floor(Math.random() * 1000);
dataURL
  .then((response) => response.json())
  .then((data) => {
    dataset = data;
    console.log(dataset);
    // Ensure that rand is initialized appropriately (e.g., rand = 0)

    console.log(dataset[rand].rating);
    document.getElementById("rating").textContent =
      dataset[rand].rating.toFixed(2);
    document.getElementById("rating two").textContent =
      "   " + dataset[rand].rating.toFixed(2);
    document.getElementById("star").textContent =
      "   " + dataset[rand].rating.toFixed(2);
    document.getElementById("maxguests").textContent =
      "   " + dataset[rand].guests + " Guests | ";
    document.getElementById("noOfBeds").textContent =
      "   " + dataset[rand].beds + " Beds | ";
    document.getElementById("noOfRooms").textContent =
      "   " + dataset[rand].bedrooms + " Rooms | ";
    document.getElementById("noOfBath").textContent =
      "   " + dataset[rand].bathrooms + " Baths ";
    // Set src attributes for image elements
    document.getElementById("title1").innerHTML = dataset[rand].name;
    document.getElementById("locationOfUnit").textContent =
      "\u00A0 \u00A0" + dataset[rand++].location;
    document.getElementById("img1").src = dataset[rand++].download_url;
    document.getElementById("img2").src = dataset[rand++].download_url;
    document.getElementById("img3").src = dataset[rand++].download_url;
    document.getElementById("img4").src = dataset[rand++].download_url;
    document.getElementById("img5").src = dataset[rand].download_url;
    // Set author names
    // document.getElementById("rating").textContent =
    //   "   " + dataset[rand].rating.toFixed(2);
    // console.log(dataset[rand].rating.toFixed(2));

    document.getElementById("author").textContent = dataset[rand].author_name;
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
// getName
//   .then((response) => response.json())
//   .then((data) => (document.getElementById("title").textContent = data.title));

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

//wishlist
const heartIcon = document.getElementById("heart");

document.addEventListener("DOMContentLoaded", function () {
  if (heartIcon) {
    heartIcon.addEventListener("click", function () {
      toggleWishlist(dataset[unitId]);
      heartIcon.classList.toggle("red-heart");
    });
  } else {
    console.error("Element with ID 'heart' not found.");
  }
});

function getWishlist() {
  const wishlistString = localStorage.getItem("wishlist");
  return wishlistString ? JSON.parse(wishlistString) : [];
}

function saveWishlist(wishlist) {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function addToWishlist(userData) {
  const wishlist = getWishlist();
  const isItemInWishlist = wishlist.some((item) => item.id === userData.id);

  if (!isItemInWishlist) {
    wishlist.push(userData);
    saveWishlist(wishlist);
  }

  updateWishlistUI(wishlist);
}

function removeFromWishlist(userData) {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter((item) => item.id !== userData.id);
  saveWishlist(updatedWishlist);
  updateWishlistUI(updatedWishlist);
}

function toggleWishlist(userData) {
  const wishlist = getWishlist();
  const isItemInWishlist = wishlist.some((item) => item.id === userData.id);

  if (isItemInWishlist) {
    removeFromWishlist(userData);
  } else {
    addToWishlist(userData);
  }
}

function updateWishlistUI(wishlist) {
  console.log("Wishlist updated:", wishlist);
  // Update UI logic here
}

//wishlist end
document.addEventListener("DOMContentLoaded", function () {
  const shareIcon = document.getElementById("shareIcon");

  shareIcon.addEventListener("click", function () {
    const linkToCopy = window.location.href; // Replace with your actual link

    const tempInput = document.createElement("input");
    tempInput.value = linkToCopy;
    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999);

    document.execCommand("copy");

    document.body.removeChild(tempInput);

    alert("Link copied to clipboard!");
  });
});
