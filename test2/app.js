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

  // Fetch both image and quote in parallel using Promise.all
  Promise.all([
    fetch("https://picsum.photos/800/400"),
    fetch("https://dummyjson.com/quotes/random")
  ])
    .then((responses) => {
      const imageResponse = responses[0];
      const quoteResponse = responses[1];

      console.log(imageResponse);
      console.log(quoteResponse);

      const imageUrl = imageResponse.url;

      // Parse the quote JSON
      return quoteResponse.json().then((quoteData) => {
        return { imageUrl, quote: quoteData.quote };
      });
    })
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
        statusDiv.textContent = "Failed to load content. Using defaults.";
        statusTimeOut();
      }
      if (posterImage) {
        posterImage.src = defaultImage;
      }
      if (posterQuote) {
        posterQuote.textContent = defaultQuote;
      }
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

