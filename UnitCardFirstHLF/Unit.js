const getImages = fetch("https://picsum.photos/v2/list?page=3&limit=100");
let images = [];
let rand = Math.floor(Math.random() * 90);

getImages
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      images.push(element);
      //   console.log(images);
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
