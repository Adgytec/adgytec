// constants
const heroTimes = 2;

// let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;

export const scrollAnimation = (main: HTMLElement) => {
	main.style.setProperty("--times", String(heroTimes));

	window.addEventListener("resize", () => {
		// viewportWidth = window.innerWidth;
		viewportHeight = window.innerHeight;
	});

	window.addEventListener("scroll", () => {
		let y = scrollY;

		const heroHeight = viewportHeight * heroTimes;

		if (y <= heroHeight) {
			handleHeroSection(y, heroHeight, main);
		}
	});
};

type HandleHeroSection = (y: number, height: number, main: HTMLElement) => void;

const handleHeroSection: HandleHeroSection = (y, height, main) => {
	const scaleAmount = 2.5;

	// scale
	let scale = 1 + (y / height) * scaleAmount;
	scale = Math.round(scale * 10) / 10;

	main.style.setProperty("--scale", String(scale));

	// opacity
	let opacity = 1 - (y / (height / 1.5)) * 1;
	opacity = Math.round(opacity * 10) / 10;

	main.style.setProperty("--opacity", String(opacity));
};
