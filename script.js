const quoteContainer = document.querySelector("#quote-container");
const quote = document.querySelector("#quote");
const author = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");


/** Show loader */
const showLoading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

/** Remove loader */
const removeLoading = () => {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
};

/** constants */
const constants = {
    unknown : "unknown",
    longClass : "long-quote"
}

/** Get Quote from API */
const getQuote = async () => {
    showLoading();

    const proxyURL = 'https://shielded-anchorage-64336.herokuapp.com/';
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(`${proxyURL}${apiURL}`);

        const {quoteText, quoteAuthor} = await response.json();
       
        if(quoteAuthor === "") {
            author.innerText = constants.unknown;
        } else {
             author.innerText = quoteAuthor;
        }

        /** reduce font size for long quote */
        if(quoteText.length > 50 ) {
            quote.classList.add(constants.longClass);
        } else {
            quote.classList.remove(constants.longClass);
        }

        quote.innerText =  quoteText;

        removeLoading();
    }
    catch(err) {
        getQuote();
    }
};


/** Tweet quote  */
const tweetQuote = () => {
    const twQuote = quote.innerText;
    const twAuthor = author.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${twQuote} - ${twAuthor}`;
    window.open(twitterUrl, '_blank');
}

/** Event listners */
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click",tweetQuote);

/** On Load */
getQuote();