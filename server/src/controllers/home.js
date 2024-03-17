const path = require("path");

const homeHtml = path.join(__dirname, "/../../client/dist/index.html");
const portfolioHTMl = path.join(__dirname, "/../../client/dist/portfolio.html");
const notfoundHTML = path.join(__dirname, "/../../client/dist/404.html");

const home = (req, res) => {
	return res.sendFile(homeHtml);
};

const portfolio = (req, res) => {
	return res.sendFile(portfolioHTMl);
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
