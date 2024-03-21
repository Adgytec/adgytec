// constants
const heroTimes = 3;
const scaleAmount = 2.5;
let width = window.innerWidth;
let height = window.innerHeight;

export const scrollAnimation = (...domElements) => {
	const main = domElements[0];

	main.style.setProperty("--times", heroTimes);

	window.addEventListener("resize", () => {
		width = window.innerWidth;
		height = window.innerHeight;
	});

	window.addEventListener("scroll", (e) => {
		let y = scrollY;

		// hero section height * heroTimes;
		const heroHeight = height * heroTimes;

		if (y <= heroHeight) {
			handleHeroSection(y, heroHeight, main);
		}
	});
};

const handleHeroSection = (y, height, main) => {
	const xScale = 1.3; // increase to see fast transition

	let scale = 1 + (y / height) * scaleAmount;
	scale = Math.round(scale * 10) / 10;

	main.style.setProperty("--scale", scale);

	let translatez = (y / height) * 10;
	let translatex = (y / height) * (width / xScale);

	main.style.setProperty("--translatez", translatez + "px");
	main.style.setProperty("--translatex", translatex + "px");
};
