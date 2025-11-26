// Default values
const defaultImage = "https://picsum.photos/id/237/800/400";
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

if (statusDiv) {
  statusDiv.textContent = "Loading poster...";
}

document.getElementById("generateBtn").addEventListener("click", () => {

  fetch("https://picsum.photos/800/400")
    .then((response) => response.url)
    .then((url) => {
      if (posterImage) {
        posterImage.src = url;
      }
      if (statusDiv) {
        statusDiv.textContent = "Poster generated!";
      }
    })
    .catch((error) => {
      console.error("Error fetching image:", error);
      if (statusDiv) {
        statusDiv.textContent = "Failed to load image. Using default.";
      }
      if (posterImage) {
        posterImage.src = defaultImage;
      }
    });
  // TODO:
  // 1. Update status to "Loading poster..."
  // 2. Fetch image from https://picsum.photos/800/400
  // 3. Fetch quote from https://dummyjson.com/quotes/random
  // 4. Update DOM with image + quote
  // 5. Handle failures with defaults

});
