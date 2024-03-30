const path = require("path");
const dotenv = require("dotenv");

// configuring for env variables
dotenv.config();

let homeHTML;
let portfolioHTML;
let notfoundHTML;
let privacyPolicyHTML;
let successHTML;
let rejectHTML;

if (process.env.ENV === "production") {
	homeHTML = path.join(__dirname, "../../dist/index.html");
	portfolioHTML = path.join(__dirname, "../../dist/portfolio.html");
	notfoundHTML = path.join(__dirname, "../../dist/404.html");
	privacyPolicyHTML = path.join(__dirname, "../../dist/privacy.html");

	successHTML = path.join(__dirname, "../../dist/success.html");
	rejectHTML = path.join(__dirname, "../../dist/reject.html");
} else {
	homeHTML = path.join(__dirname, "../../../client/dist/index.html");
	portfolioHTML = path.join(__dirname, "../../../client/dist/portfolio.html");
	notfoundHTML = path.join(__dirname, "../../../client/dist/404.html");
	privacyPolicyHTML = path.join(
		__dirname,
		"../../../client/dist/privacy.html"
	);

	successHTML = path.join(__dirname, "../../../client/dist/success.html");
	rejectHTML = path.join(__dirname, "../../../client/dist/reject.html");
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

const privacy = (req, res) => {
	return res.sendFile(privacyPolicyHTML);
};

const success = (req, res) => {
	return res.sendFile(successHTML);
};

const reject = (req, res) => {
	return res.sendFile(rejectHTML);
};

const notfound = (req, res) => {
	return res.sendFile(notfoundHTML);
};

module.exports = {
	home,
	portfolio,
	contactus,
	notfound,
	privacy,
	success,
	reject,
};
