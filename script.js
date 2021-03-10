const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const facebookBtn = document.querySelector('#facebook');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

let apiQuotes = [];

// Loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function loaderComplete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    loading();

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // If author is blank
    if (!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }

    // Checking quote length
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    let splitText = [];
    
    let quoteString = quote.text.split(' ');
    quoteString.forEach(word => {
        
        let newWord = `<div class="quote-word">${word}</div>`;
        splitText.push(newWord);
    });

    let finalText = splitText.join(' ');

    // Set quote, loader hidden
    quoteText.innerHTML = finalText;
    loaderComplete();
    
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterURL = `https://www.twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

// Share Quote - Facebook
function shareQuote() {
    const facebookURL = `http://facebook.com/sharer/sharer.php?u=, left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0')`;
    window.open(facebookURL, '_blank');
}

// Get Word Meaning
function dictionary(e) {
    let target = e.target;
    target.classList.add('hover');
    const dictionaryURL = `https://www.dictionary.com/browse/${target.textContent}?s=t`;
    window.open(dictionaryURL, '_blank');
}

// Author Wiki
function getWiki() {
    const wikiURL = `https://en.wikipedia.org/wiki/${authorText.textContent}`
    window.open(wikiURL, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
facebookBtn.addEventListener('click', shareQuote);
authorText.addEventListener('click', getWiki);
quoteText.addEventListener('click', dictionary);

// On Load
getQuotes();