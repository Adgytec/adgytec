const express = require("express");
const route = express.Router();

const {
	home,
	portfolio,
	contactus,
	privacy,
	success,
	reject,
} = require("../controllers/home");

route.get("/", home);
// route.get("/portfolio", portfolio);
route.get("/privacy-policy", privacy);
route.get("/success", success);
route.get("/reject", reject);

route.post("/contact-us", contactus);

module.exports = route;
