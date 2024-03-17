const path = require("path");
const dotenv = require("dotenv");

// configuring for env variables
dotenv.config();

// const homeHtml = path.join(__dirname, "/../../client/dist/index.html");
// const portfolioHTMl = path.join(__dirname, "/../../client/dist/portfolio.html");
// const notfoundHTML = path.join(__dirname, "/../../client/dist/404.html");

let homeHTML;
let portfolioHTML;
let notfoundHTML;

if (process.env.ENV === "production") {
	homeHTML = path.join(__dirname, "../../dist/index.html");
	portfolioHTML = path.join(__dirname, "../../dist/portfolio.html");
	notfoundHTML = path.join(__dirname, "../../dist/404.html");
} else {
	homeHTML = path.join(__dirname, "../../../client/dist/index.html");
	portfolioHTML = path.join(__dirname, "../../../client/dist/portfolio.html");
	notfoundHTML = path.join(__dirname, "../../../client/dist/404.html");
}

const home = (req, res) => {
	return res.sendFile(homeHTML);
};

const portfolio = (req, res) => {
	return res.sendFile(portfolioHTML);
};

const contactus = (req, res) => {
	return res.status(200).json({
		success: true,
		message: "This is form submission url",
	});
};

const notfound = (req, res) => {
	return res.sendFile(notfoundHTML);
};

module.exports = { home, portfolio, contactus, notfound };
