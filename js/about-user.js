async function fetchData() {
  try {
    const response = await fetch(
      "https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=30"
    );
    const data = await response.json();

    // Get a random index to select a blog post
    const randomIndex = Math.floor(Math.random() * data.blogs.length);
    const selectedBlog = data.blogs[randomIndex];

    // Create HTML content
    const contentContainer = document.getElementById("aboutOwnerContainer");
    const contentText = selectedBlog.content_text;

    if (contentText.length > 230) {
      // If content exceeds 230 words, show a "Show More" button
      const previewText = contentText.substring(0, 230);
      const fullText = contentText;
      contentContainer.innerHTML = `<p id="blogContent">${previewText}... <span id="showMoreBtn" style="cursor: pointer; color: black;">Show More</span></p>`;

      // Add a single event listener to the container
      contentContainer.addEventListener("click", (event) => {
        if (event.target.id === "showMoreBtn") {
          // Show the remaining content when "Show More" is clicked
          contentContainer.innerHTML = `<p id="blogContent">${fullText}... <span id="showLessBtn" style="cursor: pointer; color: black;">Show Less</span></p>`;
        } else if (event.target.id === "showLessBtn") {
          // Show Less functionality
          contentContainer.innerHTML = `<p id="blogContent">${previewText}... <span id="showMoreBtn" style="cursor: pointer; color: black;">Show More</span></p>`;
        }
      });
    } else {
      // If content is within 230 words, display the full content
      contentContainer.innerHTML = `<p id="blogContent">${contentText}</p>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the async function
fetchData();
