import { Particles } from "./particles";

let particle;

const updateDimension = (newWidth, newHeight) => {
	particle.update(newWidth, newHeight);
};

const handleCanvas = (canvas, width, height) => {
	let context = canvas.getContext("2d");

	particle = new Particles(canvas, context, width, height);
};

self.onmessage = (e) => {
	const { type } = e.data;
	console.log("three");

	switch (type) {
		case "canvas":
			const { canvas, width, height } = e.data;

			handleCanvas(canvas, width, height);
			break;
		case "resize":
			const { width: newWidth, height: newHeight } = e.data;

			updateDimension(newWidth, newHeight);
			break;
	}
};
