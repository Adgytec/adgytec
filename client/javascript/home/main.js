import { scrollAnimation } from "../module/scroll";
import { initCanvas } from "../module/canvas/canvas";

window.addEventListener("load", () => {
	// get the main element
	const main = document.getElementsByTagName("main")[0];
	const portfolio = document.querySelector(".portfolio-container");
	const aboutus = document.querySelector(".aboutus-container");

	initCanvas();
	scrollAnimation(main, portfolio, aboutus);
});
