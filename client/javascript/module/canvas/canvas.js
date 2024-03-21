export const initCanvas = () => {
	const canvas = document.getElementById("canvas1");
	const offscreen = canvas.transferControlToOffscreen();

	const canvasWorkerUrl = new URL("canvasWorker.js", import.meta.url);
	const canvasWorker = new Worker(canvasWorkerUrl);
	let width = window.innerWidth;
	let height = window.innerHeight;

	canvasWorker.postMessage(
		{
			type: "canvas",
			canvas: offscreen,
			width: width,
			height: height,
		},
		[offscreen]
	);

	window.addEventListener("resize", (e) => {
		const newHeight = window.innerHeight;
		const newWidth = window.innerWidth;

		canvasWorker.postMessage({
			type: "resize",
			width: newWidth,
			height: newHeight,
		});
	});
};
