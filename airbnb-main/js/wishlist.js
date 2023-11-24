const wishlistContainer = document.getElementById('imageCard');

function getWishlist() {
  const wishlistString = localStorage.getItem('wishlist');
  return wishlistString ? JSON.parse(wishlistString) : [];
}

// Function to display wishlist items
function displayWishlist() {
  wishlistContainer.innerHTML = ''; // Clear existing content
  const wishlist = getWishlist();
  console.log(wishlist);
  if (wishlist.length > 0) {
    wishlist.forEach((item) => {
      const wishlistItem = createWishlistItem(item);
      wishlistContainer.appendChild(wishlistItem);
    });
  } else {
    wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
  }
}

function saveWishlist(wishlist) {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }

function removeFromWishlist(item) {
  console.log("Hi");
  const wishlist = getWishlist();
  console.log(wishlist);
  const updatedWishlist = wishlist.filter((wishlistItem) => wishlistItem.id !== item.id);
  saveWishlist(updatedWishlist);
  const removedElement = document.getElementById(`wishlistItem-${item.id}`);
  if (removedElement) {
    removedElement.remove();
  }
  displayWishlist(); // Update the display after removing an item
}

// Function to create HTML for a wishlist item
function createWishlistItem(item) {
  
  const div = document.createElement('div');
  div.classList.add(
      'card',
      'col-lg-3',
      'col-md-4',
      'col-sm-6',
      'col-xs-6',
      'border-0',

  );
  div.id = `wishlistItem-${item.id}`; 
  const img = document.createElement('img');
  const div1 = document.createElement('div');
  div1.classList.add('wishlist-icon');

  // Create the heart icon
  const removeIcon = document.createElement('i');
  removeIcon.classList.add('fa','fa-times');
  removeIcon.addEventListener('click', () => removeFromWishlist(item));


  // Append the heart icon to div1
  div1.appendChild(removeIcon);

  img.src = item.download_url;
  const div2 = document.createElement('div');

  const div3 = document.createElement('div');
  div3.classList.add('card-title');
  const h4 = document.createElement('h4');
  const p = document.createElement('p');
  h4.textContent = item.location;
  let num = (Math.random() * 4 + 1).toFixed(1) + " <i class='fa-solid fa-star'></i>";
  p.innerHTML = num;

  const p1 = document.createElement('p');
  const span = document.createElement('span');
  span.classList.add('grey');
  span.innerHTML = 'Hosted by ' + item.author;

  let distance = (Math.random() * 300 + 1).toFixed(2);
  const p3 = document.createElement('p');
  const span1 = document.createElement('span');
  span1.classList.add('grey');
  span1.innerHTML = distance + ' km to National Park';

  const p2 = document.createElement('p');
  let num1 = item.width;
  p2.innerHTML = '₹' + num1 + ' night';

  div.appendChild(img);
  img.addEventListener('click', () => {
    openNewPage(item);
    console.log('hello event');
    console.log(item.id);
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
  wishlistContainer.append(div);
  return div;
}




document.addEventListener('DOMContentLoaded', () => {

  displayWishlist(); // Display wishlist on page load
});
