// Function to parse URL parameters
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Function to perform the search based on URL parameter
async function searchFromURL() {
    // Get the search query from the URL parameter named 'query'
    const searchQuery = getParameterByName('query');

    if (searchQuery) {
        // If there is a search query, fetch the data and render the news
        const data = await fetchData(searchQuery);
        renderMain(data.articles);
    }
}

// Call the searchFromURL function when the page loads
document.addEventListener('DOMContentLoaded', searchFromURL);
