let url = "https://mocki.io/v1/a333851f-8d2f-473c-bd8e-7c3b1a39e8c8";

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

const createCardData = (userData) => {
    const div = document.createElement('div');
    div.classList.add(
        'card',
        'col-lg-3',
        'col-md-4',
        'col-sm-6',
        'col-xs-6',
        'border-0',
        'mx-auto'
    );
    const img = document.createElement('img');
    const div1 = document.createElement('div');
    div1.classList.add('wishlist-icon');
  
    // Create the heart icon
    const heartIcon = document.createElement('i');
    heartIcon.classList.add('fas', 'fa-heart');
    heartIcon.addEventListener('click', () => toggleWishlistHandler(userData));
  
    // Append the heart icon to div1
    div1.appendChild(heartIcon);
  
    img.src = userData.download_url;
  
    const div2 = document.createElement('div');
  
    const div3 = document.createElement('div');
    div3.classList.add('card-title');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');
    h4.textContent = userData.location;
    let num = (Math.random() * 4 + 1).toFixed(1) + " <i class='fa-solid fa-star'></i>";
    p.innerHTML = num;
  
    const p1 = document.createElement('p');
    const span = document.createElement('span');
    span.classList.add('grey');
    span.innerHTML = 'Hosted by ' + userData.author;
  
    let distance = (Math.random() * 300 + 1).toFixed(2);
    const p3 = document.createElement('p');
    const span1 = document.createElement('span');
    span1.classList.add('grey');
    span1.innerHTML = distance + ' km to National Park';
  
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

function getWishlist() {
    const wishlistString = localStorage.getItem('wishlist');
    return wishlistString ? JSON.parse(wishlistString) : [];
  }
  
  // Function to save the wishlist to local storage
  function saveWishlist(wishlist) {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
  
  function toggleWishlistHandler(userData) {
    const wishlist = getWishlist();
    const isItemInWishlist = wishlist.some((item) => item.id === userData.id);
  
    if (!isItemInWishlist) {
      wishlist.push(userData);
      saveWishlist(wishlist);
    } else {
      const updatedWishlist = wishlist.filter((item) => item.id !== userData.id);
      saveWishlist(updatedWishlist);
        console.log(updatedWishlist);
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
    toggleWishlistHandler(userData);
  }
  
