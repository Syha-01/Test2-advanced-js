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

  // Create a Promise to fetch both image and quote
  let fetchPosterDataPromise = new Promise((resolve, reject) => {
    // Fetch image
    fetch("https://picsum.photos/800/400")
      .then((imageResponse) => {
        console.log(imageResponse);
        const imageUrl = imageResponse.url;

        // Fetch quote
        fetch("https://dummyjson.com/quotes/random")
          .then((quoteResponse) => {
            console.log(quoteResponse);
            return quoteResponse.json();
          })
          .then((quoteData) => {
            // Resolve with both data
            resolve({ imageUrl, quote: quoteData.quote });
          })
          .catch((error) => {
            reject("Error fetching quote: " + error.message);
          });
      })
      .catch((error) => {
        reject("Error fetching image: " + error.message);
      });
  });

  // Use the Promise
  fetchPosterDataPromise
    .then((data) => {
      // Update DOM with fetched data
      if (posterImage) {
        posterImage.src = data.imageUrl;
      }
      if (posterQuote) {
        posterQuote.textContent = data.quote;
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

