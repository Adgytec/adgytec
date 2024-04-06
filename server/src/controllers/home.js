const path = require("path");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

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

// sending mail on submission
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "adgytec.main@gmail.com",
		pass: "gyan tdnz iwqq tfps",
	},
});

const sendMail = async (text) => {
	const mailOptions = {
		from: "adgytec.main@gmail.com",
		// to: "info@traveleyes.in",
		to: "rohanverma031@gmail.com",
		subject: "Contact Us Submission",
		text,
	};

	return await transporter.sendMail(mailOptions);
};

const contactus = async (req, res) => {
	const { name, email, number, service, tellusmore } = req.body;

	if (!name || !email || !number || !service) {
		return res.status(400).json({
			status: "error",
			message: "Invalid or incomplete input details",
		});
	}

	let text = `Form Submission Data. 
    Name: ${name}
    Email: ${email}
    Mobile: ${number}
    Service: ${service}
    ${tellusmore.length > 0 ? `Tell Us More: ${tellusmore}` : ""}
`;

	try {
		await sendMail(text);

		return res.status(201).json({
			status: "successfull",
			message: "Successfully got your detials",
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			status: "error",
			message: "Internal Server Error",
		});
	}
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
