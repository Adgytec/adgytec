const fs = require("fs-extra");
const { resolve } = require("path");

const sourcePath = resolve(__dirname, "client/dist");
const destinationPath = resolve(__dirname, "server/dist");

// Move folder
fs.move(sourcePath, destinationPath, (err) => {
	if (err) {
		console.error("Error moving folder:", err);
	} else {
		console.log("Folder moved successfully");
	}
});
