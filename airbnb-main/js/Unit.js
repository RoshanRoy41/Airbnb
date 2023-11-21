let imgData = "https://picsum.photos/v2/list?page=2&limit=100";
let images = [];
const urlParams = new URLSearchParams(window.location.search);
// let userId = urlParams.get("id");
let userId = 190;
let index;

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    data.forEach((userData) => {
      console.log(userData);
      images.push(userData);
    });
    updateImagesAndAuthor();
  } catch (e) {
    console.error(e);
  }
};

const updateImagesAndAuthor = () => {
  if (images.length > 0) {
    document.getElementById("img1").src = findImageById(userId).download_url;

    document.getElementById("img2").src = findImageById(
      userId + 1
    ).download_url;
    document.getElementById("img3").src = findImageById(
      userId + 2
    ).download_url;
    document.getElementById("img4").src = findImageById(
      userId + 3
    ).download_url;
    document.getElementById("img5").src = findImageById(
      userId + 4
    ).download_url;

    // author name
    document.getElementById("author").textContent =
      images[userId % images.length].author;
  } else {
    console.error("User ID not found or images array is empty");
  }
};
// Function to find image by id
function findImageById(idToFind) {
  return images.find((image) => image.id === String(idToFind));
}
// Call the function to get data from the API
getData(imgData);

let rating = 1 + Math.random() * 4;
let reviewNum = Math.floor(Math.random() * 1000);

// random rating out of 5
document.getElementById("rating").textContent = "   " + rating.toFixed(2);
document.getElementById("rating two").textContent = "   " + rating.toFixed(2);
//number of reviews
document.getElementById("reviewsNum").textContent = reviewNum + " ";
document.getElementById("reviewsNum two").textContent =
  " " + reviewNum + " Reviews";

const getName = fetch(`https://jsonplaceholder.typicode.com/todos/${rand}`);

//getiing random name for Unit
getName
  .then((response) => response.json())
  .then((data) => (document.getElementById("title").textContent = data.title));

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
