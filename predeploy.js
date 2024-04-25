const fs = require("fs-extra");
const { resolve } = require("path");

const sourcePath = resolve(__dirname, "client/dist");
const destinationPath = resolve(__dirname, "server/dist");

// remove folder
const dir = "./client";

const removeClient = () => {
	fs.rm(dir, { recursive: true, force: true }, (err) => {
		if (err) {
			throw err;
		}

		console.log(`${dir} is deleted!`);
	});
};

// Move folder
fs.move(sourcePath, destinationPath, { overwrite: true }, (err) => {
	if (err) {
		console.error("Error moving folder:", err);
	} else {
		console.log("Folder moved successfully");

		if (process.env.ENV === "production") removeClient();
		else console.log("skip deleting client files");
	}
});
