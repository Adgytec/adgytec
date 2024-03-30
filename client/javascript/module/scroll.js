// constants
const heroTimes = 2;

let width = window.innerWidth;
let height = window.innerHeight;

export const scrollAnimation = (...domElements) => {
	const main = domElements[0];
	const portfolio = domElements[1];
	const aboutus = domElements[2];

	const aboutusText = aboutus.childNodes[1].childNodes[3].childNodes[1];
	const aboutusText2 = aboutus.childNodes[1].childNodes[3].childNodes[3];

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
		const portfolioHeight = Math.round(
			portfolio.getBoundingClientRect().bottom + window.scrollY
		);

		const aboutusTextStart =
			aboutusText.getBoundingClientRect().top + window.scrollY - height;
		const aboutusHeight =
			aboutus.getBoundingClientRect().bottom + window.scrollY;

		if (y <= heroHeight) {
			handleHeroSection(y, heroHeight, main);
		}

		if (y >= portfolioStart) {
			let offsetY = y - portfolioStart;

			handlePortfolioSection(offsetY, portfolio);
		}

		if (y >= aboutusTextStart) {
			let offsetY = Math.round(y - aboutusTextStart);

			handleAboutusSection(offsetY, aboutusText, aboutusText2);
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
	const headingFill = height / 2;

	if (y <= headingFill) {
		let backgroundSize = (y / headingFill) * 125;

		portfolio.style.setProperty("--background-size", backgroundSize + "%");
	}
};

const handleAboutusSection = (y, aboutusText, aboutusText2) => {
	const aboutusTextEnd = height / 4;
	const aboutusText2End = height / 3;

	let x = Math.round((y / aboutusTextEnd) * 100);
	x = Math.min(100, x);

	aboutusText.style.setProperty("--x", x + "%");

	if (y >= aboutusTextEnd) {
		y = y - aboutusTextEnd;

		let x = Math.round((y / aboutusText2End) * 100);
		x = Math.min(100, x);

		aboutusText2.style.setProperty("--x", x + "%");
	}
};
