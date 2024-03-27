// constants
const heroTimes = 3;

let width = window.innerWidth;
let height = window.innerHeight;

export const scrollAnimation = (...domElements) => {
	const main = domElements[0];
	const portfolio = domElements[1];

	main.style.setProperty("--times", heroTimes);

	window.addEventListener("resize", () => {
		width = window.innerWidth;
		height = window.innerHeight;
	});

	window.addEventListener("scroll", (e) => {
		let y = scrollY;

		const heroHeight = height * heroTimes;
		const portfolioStart = Math.round(
			portfolio.getBoundingClientRect().top +
				window.scrollY -
				height / 1.2
		);

		if (y <= heroHeight) {
			handleHeroSection(y, heroHeight, main);
		}

		if (y >= portfolioStart) {
			let offsetY = y - portfolioStart;

			handlePortfolioSection(offsetY, portfolio);
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
};

const handlePortfolioSection = (y, portfolio) => {
	const heading = portfolio.childNodes[1].childNodes[1];
	// const headingHeight = heading.offsetHeight;
	const headingFill = height / 2;

	const items = portfolio.childNodes[1].childNodes[3].childNodes;

	if (y <= headingFill) {
		let backgroundSize = (y / headingFill) * 100;

		portfolio.style.setProperty(
			"--background-size",
			backgroundSize + 1 + "%"
		);
	}

	for (let i = 1; i < items.length; i += 2) {
		// if (i != 1) continue;
		let item = items[i];
		let top = Math.round(item.getBoundingClientRect().top - height * 1.1);
		// let bottom = item.getBoundingClientRect().bottom - height;

		if (top <= -100) {
			let scale = Math.max((y / height / 0.7) * 1, 0.5);
			scale = Math.min(1, scale);
			let opacity = scale;

			item.style.setProperty("--scale", scale);
			item.style.setProperty("--opacity", opacity);
		}
	}
};
