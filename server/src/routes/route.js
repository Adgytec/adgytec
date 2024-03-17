const express = require("express");
const route = express.Router();

const { home, portfolio, contactus } = require("../controllers/home");

route.get("/", home);
route.get("/portfolio", portfolio);

route.post("/contact-us", contactus);

module.exports = route;
