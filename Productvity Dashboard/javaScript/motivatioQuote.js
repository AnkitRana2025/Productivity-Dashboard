const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuoteBtn");

async function getQuote() {

    try {

        quoteText.textContent = "Loading...";
        quoteAuthor.textContent = "";

        const response = await fetch(
            "https://dummyjson.com/quotes/random"
        );

        const data = await response.json();

        quoteText.textContent = `"${data.quote}"`;

        quoteAuthor.textContent = `— ${data.author}`;

    }

    catch (error) {

        quoteText.textContent = "Failed to load quote.";

        quoteAuthor.textContent = "";

        console.log(error);

    }

}

newQuoteBtn.addEventListener("click", getQuote);

getQuote();