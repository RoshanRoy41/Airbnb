let imgData = fetch("http://localhost:3001/api");
let images = [];
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");
let rand = userId;

imgData
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      images.push(element);
      console.log(images);
      //   console.log(images.download_url);
    });
    //random images for unit
    document.getElementById("img1").src = images[rand++].download_url;
    document.getElementById("img2").src = images[rand++].download_url;
    document.getElementById("img3").src = images[rand++].download_url;
    document.getElementById("img4").src = images[rand++].download_url;
    document.getElementById("img5").src = images[rand++].download_url;
    // author name
    document.getElementById("author").textContent = images[userId].author_name;
  });
let rating = 1 + Math.random() * 4;
let reviewNum = Math.floor(Math.random() * 1000);
console.log(rand);
// random rating out of 5
document.getElementById("rating").textContent = "   " + imgData.rating;
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
