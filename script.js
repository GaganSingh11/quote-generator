const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter-button')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');


let apiQuotes = []

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    loading();
    // pick a random quote fron apiQuote array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace it with 'Unkown'
    if (!quote.author) {
        authorText.textContent = 'Unkown'
    }else {
        authorText.textContent = quote.author;
    }
    // check quote length to determine styling
    if (quote.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote and hide loader
    quoteText.textContent = quote.text
    complete();

}
// Get Quote From Api
async function getQuotes() {
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const responce = await fetch(apiUrl);
        apiQuotes = await responce.json();
        newQuote();

    } catch (error) {

        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listerner
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();