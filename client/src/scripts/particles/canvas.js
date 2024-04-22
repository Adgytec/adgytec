import { Particles } from "./particles";

export const initCanvas = () => {
	const canvas = document.getElementById("canvas1");

	let width = window.innerWidth;
	let height = window.innerHeight;

	let context = canvas.getContext("2d");

	let particle = new Particles(canvas, context, width, height);

	window.addEventListener("resize", (e) => {
		const newHeight = window.innerHeight;
		const newWidth = window.innerWidth;

		particle.update(newWidth, newHeight);
	});
};
