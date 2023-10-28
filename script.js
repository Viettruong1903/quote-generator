const quoteContainer = document.querySelector('#quote-container');
const quote = document.querySelector('#quote');
const quoteAuthor = document.querySelector('#author');
const newQuoteButton = document.querySelector('#new-quote');
const twitterButton = document.querySelector('#twitter');
const loader = document.querySelector('.loader');
let data = [];
// loading function
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// complete function
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
// generate random quotes
function randomQuote() {
  loading();
  const randomObject = data[Math.floor(Math.random() * data.length)];

  if(!randomObject.author) {
    quoteAuthor.textContent = 'UnKnown';
  } else {
    quoteAuthor.textContent = randomObject.author;
  }

  if(randomObject.text.length > 120) {
    quote.classList.add('long-quote');
  } else {
    quote.classList.remove('long-quote');
  }
  quote.textContent = randomObject.text;
  complete();
 }; 

 function twittQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
 }

async function fetchData() {
  loading();
  const url = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    const response = await fetch(url);
    data = await response.json();
    randomQuote();
    
  } catch (error) {
    alert('error');
  }
}

const removeHidden = document.querySelector('.loader-hidden');

twitterButton.addEventListener('click',twittQuote);
newQuoteButton.addEventListener('click',randomQuote);

fetchData();







