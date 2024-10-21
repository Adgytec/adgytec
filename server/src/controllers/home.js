const path = require("path");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

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
	notfoundHTML = path.join(__dirname, "../../dist/not-found/index.html");
	privacyPolicyHTML = path.join(
		__dirname,
		"../../dist/privacy-policy/index.html"
	);

	successHTML = path.join(__dirname, "../../dist/success/index.html");
	rejectHTML = path.join(__dirname, "../../dist/reject/index.html");
} else {
	homeHTML = path.join(__dirname, "../../../client/dist/index.html");
	notfoundHTML = path.join(
		__dirname,
		"../../../client/dist/not-found/index.html"
	);
	privacyPolicyHTML = path.join(
		__dirname,
		"../../../client/dist/privacy-policy/index.html"
	);

	successHTML = path.join(
		__dirname,
		"../../../client/dist/success/index.html"
	);
	rejectHTML = path.join(__dirname, "../../../client/dist/reject/index.html");
}

const home = (req, res) => {
	return res.sendFile(homeHTML);
};

const portfolio = (req, res) => {
	return res.sendFile(portfolioHTML);
};

const validEmail = (email) => {
	const regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

	return regx.test(email);
};

// sending mail on submission
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "info@adgytec.in",
		pass: process.env.PASS,
	},
});

const handlebarOptions = {
	viewEngine: {
		partialsDir: path.resolve("./views/"),
		defaultLayout: false,
	},
	viewPath: path.resolve("./views/"),
};

transporter.use("compile", hbs(handlebarOptions));

const sendMail = async (
	name,
	email,
	number,
	service,
	tellusmore,
	to = "adgytec.main@gmail.com",
	template = "contact"
) => {
	tellusmore = tellusmore.length > 0 ? tellusmore : "Not-filled";

	const mailOptions = {
		from: "Adgytec",
		template,
		to,
		subject: "Adgytec Form Submission",
		context: {
			name: name,
			email: email,
			number: number,
			service: service,
			more: tellusmore,
		},
		attachments: [
			{
				filename: "logo.png",
				path: __dirname + "/../../views/logo.png",
				cid: "logo",
			},
		],
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

	if (!validEmail(email)) {
		return res.status(400).json({
			status: "error",
			message: "Invalid email",
		});
	}

	try {
		const url = `${process.env.API_ROUTE}/services/contact-us`;
		let res = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.API_TOKEN}`,
				"Content-type": "application/json; charset=UTF-8",
			},
			body: JSON.stringify(res.body),
		});
		res = await res.json();
		if (res.error) throw new Error(res.message);

		sendMail(name, email, number, service, tellusmore);
		sendMail(
			name,
			email,
			number,
			service,
			tellusmore,
			email,
			"contact_response"
		);

		return res.status(201).json({
			status: "successfull",
			message: "Successfully got your details",
		});
	} catch (err) {
		console.error(err);

		return res.status(500).json({
			status: "error",
			message: err.message,
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
