const API_KEY = "499d03534f224e8890dcd1f95376001c"
const url = "https://newsapi.org/v2/everything?q="
const pageSize = 19; 



async function fetchData(query){
    const res = await fetch(`${url}${query}&pageSize=${pageSize}&apiKey=${API_KEY}`)
    const data = await res.json()
    return data
}
fetchData("all").then(data => renderMain(data.articles))

//menu btn
let mobilemenu = document.querySelector(".mobile")
let menuBtn = document.querySelector(".menuBtn")
let menuBtnDisplay = true;

menuBtn.addEventListener("click",()=>{
    mobilemenu.classList.toggle("hidden")
})



// Render the main card
function renderMainCard(mainArticle) {
    if (mainArticle.urlToImage) {
        return `
            <div class="main-card">
                <a href=${mainArticle.url}>
                    <img src=${mainArticle.urlToImage} lazy="loading" />
                    <div class="main-card-content">
                        <h2>${mainArticle.title}</h2>
                        <div class="publishbyDate">
                            <p>${mainArticle.source.name}</p>
                            <span>•</span>
                            <p>${new Date(mainArticle.publishedAt).toLocaleDateString()}</p>
                        </div>
                        <div class="desc">
                            ${mainArticle.description}
                        </div>
                    </div>
                </a>
            </div>
        `;
    }
    return ''; // Return an empty string if there's no image for the main card
}

// Render news cards
function renderMain(arr) {
    let mainCardHTML = '';
    let newsCardHTML = '';

    // Assume the first article is the main article
    const mainArticle = arr[0];

    // Render the main card
    mainCardHTML = renderMainCard(mainArticle);

    // Render the rest of the news cards
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].urlToImage) {
            newsCardHTML += `
                <div class="card">
                    <a href=${arr[i].url}>
                        <img src=${arr[i].urlToImage} lazy="loading" />
                        <h4>${arr[i].title}</h4>
                        <div class="publishbyDate">
                            <p>${arr[i].source.name}</p>
                            <span>•</span>
                            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                        </div>
                        <div class="desc">
                            ${arr[i].description}
                        </div>
                    </a>
                </div>
            `;
        }
    }

    // Set the inner HTML of the main and news containers
    document.querySelector(".main-card-container").innerHTML = mainCardHTML;
    document.querySelector(".news-card-container").innerHTML = newsCardHTML;
}




const searchBtn = document.getElementById("searchForm")
const searchInput = document.getElementById("searchInput")

searchBtn.addEventListener("submit",async(e)=>{
    e.preventDefault()
    console.log(searchInput.value)

    const data = await fetchData(searchInput.value)
    renderMain(data.articles)

})


async function Search(query){
    const data = await fetchData(query)
    renderMain(data.articles)
}
