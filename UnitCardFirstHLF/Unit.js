const getImages = fetch("https://picsum.photos/v2/list?page=3&limit=100");
let images = [];
let rand = Math.floor(Math.random() * 90);

getImages
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
    document.getElementById("author").textContent = images[rand++].author;
  });
let rating = 1 + Math.random() * 4;
let reviewNum = Math.floor(Math.random() * 1000);
console.log(rand);
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

const getCountry = fetch("https://api.apipip.com/v1/random-country/");
getCountry
  .then((response) => response.json())
  .then((data) => {
    console.log("Name:", data.name);
  })
  .catch((error) => console.log("Error:", error));

const url = "https://dummyjson.com/users";

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const showData = document.querySelector(".reviewsTexts");
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
  } catch (e) {
    console.log(e);
  }
};

getData(url);

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

// async function fetchData() {
//   try {
//     const response = await fetch("https://picsum.photos/200/300");
//     const result = await response.text();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }
// fetchData();
// const getNamesforReview = fetch("https://dummyjson.com/users/");
// // console.log(getNamesforReview);

// getNamesforReview
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//     const usersForReview = [];
//     data.users.forEach((element) => {
//       usersForReview.push(element);
//       console.log(usersForReview.firstName);
//     });
//     let reviewsTexts = document.querySelector(".reviewsTexts");

//     for (let i = 0; i < 4; i++) {
//       const oneReview = document.createElement("div");
//       oneReview.classList.add("oneReview");
//       const oneReviewName = document.createElement("h4");
//       oneReviewName.classList.add("oneReview-Name");
//       const oneReviewPara = document.createElement("p");
//       oneReviewPara.setAttribute("id", "oneReviewPara");
//     }
//     document.querySelector(
//       ".oneReview-Name"
//     ).textContent = `${usersForReview[0].firstName} ${usersForReview[0].lastName}`;
//     document.getElementById(
//       "oneReviewPara"
//     ).textContent = `Lorem ipsum  quis nostrud exercitation . Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

//     oneReview.appendChild(oneReviewName);
//     oneReview.appendChild(oneReviewPara);
//     reviewsTexts.appendChild(oneReview);
//   })
//   .catch((error) => console.error("Error:", error));
//getting julias ID
// const urlParam = new URLSearchParams(window.location.search);

// const id = Number(urlParam.get("id"));
// console.log(typeof id);

// dataProcess(url, id);
