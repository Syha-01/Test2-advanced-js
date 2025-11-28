// Default values
const defaultImage = "default.jpg";
const defaultQuote = "quote - Enrisen Tzib";

//adding default stuffs
const posterQuote = document.getElementById("posterQuote");
const posterImage = document.getElementById("posterImage");
const statusDiv = document.getElementById("status");

if (posterQuote) {
  posterQuote.textContent = defaultQuote;
}

if (posterImage) {
  posterImage.src = defaultImage;
}

//adding event listener for when button is clicked.
document.getElementById("generateBtn").addEventListener("click", () => {

  if (statusDiv) {
    statusDiv.textContent = "Generating poster...";
  }

  // 2 & 3. Fetch image and quote using fetch API
  const imagePromise = fetch("https://picsum.photos/800/400")
    .then(response => {
      if (!response.ok) throw new Error("Image fetch failed");
      return response.url;
    })
    .catch(() => {
      // Fallback to local image using fetch
      return fetch(defaultImage)
        .then(response => {
          if (!response.ok) throw new Error("Local image fetch failed");
          return response.url;
        });
    });

  const quotePromise = fetch("https://dummyjson.com/quotes/random")
    .then(response => {
      if (!response.ok) throw new Error("Quote fetch failed");
      return response.json();
    })
    .then(data => data.quote)
    .catch(() => {
      return defaultQuote;
    });

  Promise.all([imagePromise, quotePromise])
    .then(([imageUrl, quote]) => {
      // Update DOM with fetched data
      if (posterImage) {
        posterImage.src = imageUrl;
      }
      if (posterQuote) {
        posterQuote.textContent = quote;
      }
      if (statusDiv) {
        statusDiv.textContent = "Poster generated!";
        statusTimeOut();
      }
    })
    .catch((error) => {
      // Handle errors
      console.error("Error fetching content:", error);
      if (statusDiv) {
        statusDiv.textContent = "Failed to load content. Using default.";
        statusTimeOut();
      }
      if (posterImage) {
        posterImage.src = defaultImage;
      }
      if (posterQuote) {
        posterQuote.textContent = defaultQuote;
      }
    })
    .finally(() => {
      console.log("Poster generated a successfully");
    });

  // TODO:
  // 1. Update status to "Loading poster..."
  // 2. Fetch image from https://picsum.photos/800/400
  // 3. Fetch quote from https://dummyjson.com/quotes/random
  // 4. Update DOM with image + quote
  // 5. Handle failures with defaults

});

function statusTimeOut() {
  setTimeout(() => {
    if (statusDiv) {
      statusDiv.textContent = "";
    }
  }, 3000);
}

