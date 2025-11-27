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
document.getElementById("generateBtn").addEventListener("click", async () => {

  if (statusDiv) {
    statusDiv.textContent = "Generating poster...";
  }

  try {
    const imageResponse = await fetch("https://picsum.photos/800/400");
    const quoteResponse = await fetch("https://dummyjson.com/quotes/random");

    console.log(imageResponse);
    console.log(quoteResponse);

    const imageUrl = imageResponse.url;
    const quoteData = await quoteResponse.json();
    const quote = quoteData.quote;

    if (posterImage) {
      posterImage.src = imageUrl;
    }
    if (posterQuote) {
      posterQuote.textContent = quote;
    }
    if (statusDiv) {
      statusDiv.textContent = "Poster generated!";
      statusTimeOut()
    }
  } catch (error) {
    console.error("Error fetching content:", error);
    if (statusDiv) {
      statusDiv.textContent = "Failed to load content. Using defaults.";
      statusTimeOut()
    }
    if (posterImage) {
      posterImage.src = defaultImage;
    }
    if (posterQuote) {
      posterQuote.textContent = defaultQuote;
    }
  }

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

