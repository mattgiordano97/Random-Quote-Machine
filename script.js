/* Constants and global variables */
const colors = ["brown", "blueviolet", "burlywood", "cadetblue", "darkslategrey", "sienna", "seagreen", "plum"];
let currentColor = "";

const quotesUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
let quoteArr = [];
let currentQuote = "";
let currentAuthor = "";

/* FUNCTIONS */
const changeQuote = () => {
    const otherQuotes = quoteArr.slice().filter((el) => el.quote !== currentQuote);
    const randomQuoteObj = otherQuotes[Math.floor(Math.random() * otherQuotes.length)];
    currentQuote = randomQuoteObj.quote;
    currentAuthor = randomQuoteObj.author;

    $('#author-text').text(currentAuthor);
    $('#quote-text').text(currentQuote);
}

/* Select randomly one element from colors, assign it to currentColor and change CSS variable to that color */
const changeBg = () => {
    const otherColors = colors.slice().filter((color) => color !== currentColor);
    currentColor = otherColors[ Math.floor(Math.random() * otherColors.length) ];
    $(':root').css('--quoteColors', currentColor);
};

/* Build twitter url to share this quote */
const setTwitterUrl = () => {
    $('#twitter-link').attr(
        'href',
        'https://twitter.com/intent/tweet?text=' +
        encodeURIComponent(currentQuote) +
        " " +
        encodeURIComponent(currentAuthor)
    );
};

/* Build tumblr url to share this quote */
const setTumblrUrl = () => {
    $('#tumblr-link').attr(
        'href',
        'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
        encodeURIComponent(currentAuthor) +
        '&content=' +
        encodeURIComponent(currentQuote) +
        '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
    );
};

/* Calls function to change background and to build share links */
const updateQuote = () => {
    changeBg();
    changeQuote();
    setTwitterUrl();
    setTumblrUrl();
}

function fetchQuotes() {
    fetch(quotesUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON data from the response
        })
        .then(data => {
            quoteArr = data.quotes;
            console.log("quoteArr", quoteArr);
            updateQuote();
        })
        .catch(error => {
            // If there is an error, disable new quote button and links
            console.error('There was a problem with the fetch operation:', error);
            $('#new-quote-btn').attr('disabled', true);
            $('#twitter-link').attr('href', '#');
            $('#tumblr-link').attr('href', '#');
        });
}




$(document).ready(function () {
    /* On page load */
    fetchQuotes();

    /* Button event listener */
    $('#new-quote-btn').on("click", updateQuote);
});