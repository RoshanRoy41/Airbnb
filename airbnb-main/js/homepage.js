let url = "https://mocki.io/v1/a333851f-8d2f-473c-bd8e-7c3b1a39e8c8";

const wishlistPopup = document.getElementById('wishlist-popup');

const AlreadyWishlistPopup = document.getElementById('already-wishlist-popup');

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    data.map((userData) => {
      console.log(userData);
      const imageCard = document.getElementById('imageCard');
      const cardData = createCardData(userData);
      imageCard.appendChild(cardData);
    });
  } catch (e) {
    console.log(e);
  }
};

getData(url);

//To create a listing card
const createCardData = (userData) => {
    const div = document.createElement('div');
    div.classList.add(
        'card',
        'col-lg-3',
        'col-md-4',
        'col-sm-6',
        'col-xs-6',
        'border-0',
  
    );

    const img = document.createElement('img');
    const div1 = document.createElement('div');
    div1.classList.add('wishlist-icon');
  
    // Create the heart icon
    // div1.innerHTML = '<i class="fas fa-heart"></i>';
    // div1.addEventListener('click', () => toggleWishlistHandler(userData));

    const heartIcon = document.createElement('i');
    heartIcon.classList.add('fas', 'fa-heart');
    console.log(heartIcon);
    heartIcon.addEventListener('click', function() {
      console.log("Add aayi");
      addToWishlist(userData);
      console.log('Heart icon clicked!');
    });
    
    div1.appendChild(heartIcon);
  
    img.src = userData.download_url;
  
    const div2 = document.createElement('div');
  
    const div3 = document.createElement('div');
    div3.classList.add('card-title');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');
    h4.textContent = userData.name;
    let num = userData.rating + " <i class='fa-solid fa-star'></i>";
    p.innerHTML = num;
  
    const p1 = document.createElement('p');
    const span = document.createElement('span');
    span.classList.add('grey');
    span.innerHTML = 'Hosted by ' + userData.author_name;
    console.log(userData.author_name);
  
    let distance = (Math.random() * 300 + 1).toFixed(2);
    const p3 = document.createElement('p');
    const span1 = document.createElement('span');
    span1.classList.add('grey');
    span1.innerHTML = userData.location;
  
    const p2 = document.createElement('p');
    let num1 = userData.width;
    p2.innerHTML = '₹' + num1 + ' night';
  
    div.appendChild(img);
    img.addEventListener('click', () => {
      openNewPage(userData);
      console.log('hello event');
      console.log(userData.id);
    });
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
    imageCard.append(div);
    return div;
};



const openNewPage = (userData) => {
  window.location.href = `unitcard.html?id=${userData.id}`;
};

function showWishlistPopup() {
  wishlistPopup.style.display = 'block';

  // Hide the popup after a certain duration (e.g., 3 seconds)
  setTimeout(() => {
    wishlistPopup.style.display = 'none';
  }, 2500);
}

function alreadyWishlistPopup() {
  AlreadyWishlistPopup.style.display = 'block';

  // Hide the popup after a certain duration (e.g., 3 seconds)
  setTimeout(() => {
    AlreadyWishlistPopup.style.display = 'none';
  }, 2500);
}


function getWishlist() {
    const wishlistString = localStorage.getItem('wishlist');
    return wishlistString ? JSON.parse(wishlistString) : [];
  }
  
  // Function to save the wishlist to local storage
  function saveWishlist(wishlist) {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
  
  function addToWishlist(userData) {
    showWishlistPopup();
    const wishlist = getWishlist();
    const isItemInWishlist = wishlist.some((item) => item.id === userData.id);
  
    if (!isItemInWishlist) {
      wishlist.push(userData);
      saveWishlist(wishlist);

    } else {
      alreadyWishlistPopup();
    }
    // Update the UI or perform any other actions related to the wishlist
    updateWishlistUI(wishlist);
    
  }
  
  function updateWishlistUI(wishlist) {
    // You can add UI updates here, e.g., changing the color of the heart icon
    console.log('Wishlist updated:', wishlist);
  }
  
  // Function to handle adding/removing items to/from the wishlist
  function toggleWishlist(userData) {
    addToWishlist(userData);
  }
  
