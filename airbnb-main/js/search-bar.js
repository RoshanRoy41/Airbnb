const searchUrl = 'https://mocki.io/v1/ab5e68c0-af4e-4d69-afdf-cf058b6f8f83';

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchInput');
    searchBar.addEventListener('input', handleSearch);

    let originalData = []; 

    // Fetch the initial data when the page loads
    getData(searchUrl);

    function handleSearch() {
        const searchTerm = searchBar.value.trim().toLowerCase();

        if (searchTerm.length > 0) {
            // If search term is provided, filter the original data
            const filteredData = originalData.filter((userData) =>
                userData.location.toLowerCase().includes(searchTerm)
            );
            displaySearchResults(filteredData);
        } else {
            // If no search term, display the original data
            displaySearchResults(originalData);
        }
    }

    async function getData(url) {
        try {
            const response = await fetch(url);
            originalData = await response.json();
            displaySearchResults(originalData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function displaySearchResults(results) {
        const imageCard = document.getElementById('imageCard');
        imageCard.innerHTML = '';

        if (results.length > 0) {
            results.forEach((userData) => {
                const cardData = createCardData(userData);
                imageCard.appendChild(cardData);
            });
        } else {
            showNoResultsMessage();
        }
    }

    function showNoResultsMessage() {
        const imageCard = document.getElementById('imageCard');
        imageCard.innerHTML = '<div class="no-results-message"><p>No search results found.</p></div>';
    }

    const createCardData = (userData) => {
        const div = document.createElement("div");
        div.classList.add("card", "col-lg-3", "col-md-4", "col-sm-6","col-xs-6","border-0","mx-auto");

        
        const img = document.createElement("img");
        const div1 = document.createElement("div");
        div1.classList.add("wishlist-icon");
        div1.innerHTML = `<i class='fas fa-heart' onclick="toggleWishlistHandler(${JSON.stringify(userData)})"></i>`;
        img.src = userData.download_url;

        const div2 = document.createElement("div");

        const div3 = document.createElement("div");
        div3.classList.add("card-title");
        const h4 = document.createElement("h4");
        const p = document.createElement("p");
        h4.textContent=userData.location;
        let num =(Math.random()*4+1).toFixed(1)+ " <i class='fa-solid fa-star'></i>";
        p.innerHTML = num;

        const p1 = document.createElement("p");
        const span = document.createElement("span");
        span.classList.add("grey");
        span.innerHTML="Hosted by "+  userData.author;

        let distance = (Math.random()*300+1).toFixed(2);
        const p3 = document.createElement("p");
        const span1 = document.createElement("span");
        span1.classList.add("grey");
        span1.innerHTML=distance+" km to National Park";

    
        const p2 = document.createElement("p");
        let num1 = userData.width;
        p2.innerHTML="₹"+num1+ " night";

        div.appendChild(img);
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

        img.addEventListener('click',()=>{
            openNewPage(userData);
            console.log("hello event");
            console.log(userData.id);
        })
        return div;
    }

    const openNewPage = (userData)=>{
        window.location.href = `unitcard.html?id=${userData.id}`
    }
});

function toggleWishlistHandler(userData) {
    toggleWishlist(userData);
}

// Function to save the wishlist to local storage
function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
  
  // Function to handle adding/removing items to/from the wishlist
  function toggleWishlist(userData) {
    const wishlist = getWishlist();
    const isItemInWishlist = wishlist.some(item => item.id === userData.id);
  
    if (!isItemInWishlist) {
      wishlist.push(userData);
    } else {
      const updatedWishlist = wishlist.filter(item => item.id !== userData.id);
      saveWishlist(updatedWishlist);
    }
  
    // Update the UI or perform any other actions related to the wishlist
    updateWishlistUI(wishlist);

    function updateWishlistUI(wishlist) {
        // You can add UI updates here, e.g., changing the color of the heart icon
        console.log('Wishlist updated:', wishlist);
      }
  }
