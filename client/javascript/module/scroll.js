// constants
const heroTimes = 3;

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
	const scaleAmount = 2.5;

	// scale
	let scale = 1 + (y / height) * scaleAmount;
	scale = Math.round(scale * 10) / 10;

	main.style.setProperty("--scale", scale);

	// opacity
	let opacity = 1 - (y / height) * 1;
	opacity = Math.round(opacity * 10) / 10;

	main.style.setProperty("--opacity", opacity);
	console.log(opacity);
};
