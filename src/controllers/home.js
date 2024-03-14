const home = (req, res) => {
	return res.status(200).json({
		success: true,
		message: "This is home page",
	});
};

const portfolio = (req, res) => {
	return res.status(200).json({
		success: true,
		message: "This is portfolio page",
	});
};

const contactus = (req, res) => {
	return res.status(200).json({
		success: true,
		message: "This is form submission url",
	});
};

const notfound = (req, res) => {
	return res.status(404).json({
		success: false,
		message: "404 page not found",
	});
};

module.exports = { home, portfolio, contactus, notfound };
