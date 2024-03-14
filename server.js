const express = require("express");
const dotenv = require("dotenv");

// configuring for env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.static("client/dist"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const home = require("./src/routes/route");
const { notfound } = require("./src/controllers/home");

app.use("/", home);

// handle 404
app.get("*", notfound);

app.listen(PORT, (error) => {
	if (error) {
		console.error("Error occurred, Server can't start ", error);
		return;
	}

	console.info("Server is running on port: ", PORT);
});
