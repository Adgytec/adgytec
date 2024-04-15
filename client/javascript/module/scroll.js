// constants
const heroTimes = 2;

let width = window.innerWidth;
let height = window.innerHeight;

const ourWorkMedia = window.matchMedia(
	"(min-width: 48em) and (orientation: landscape) and (min-height: 43em)"
);

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
			portfolio.getBoundingClientRect().top + window.scrollY
		);
		const portfolioHeadStart = Math.round(portfolioStart - height / 1.2);
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

		// if (y >= portfolioHeadStart) {
		// 	let offsetY = y - portfolioHeadStart;

		// 	handlePortfolioSection(offsetY, portfolio);
		// }

		// if (y >= aboutusTextStart) {
		// 	let offsetY = Math.round(y - aboutusTextStart);

		// 	handleAboutusSection(offsetY, aboutusText, aboutusText2);
		// }

		// if (ourWorkMedia.matches) {
		// 	const portfolioHeadTop = Math.round(portfolioStart + height / 1.5);

		// 	if (y >= portfolioHeadTop) {
		// 		let offsetY = Math.round(y - portfolioHeadTop);
		// 		let offsetHeight =
		// 			portfolioHeight - portfolioStart - height * 2.5;

		// 		handlePortfolioHorizontalScroll(offsetY, offsetHeight);
		// 	}
		// }
	});
};

const handleHeroSection = (y, height, main) => {
	const scaleAmount = 2.5;

	// scale
	let scale = 1 + (y / height) * scaleAmount;
	scale = Math.round(scale * 10) / 10;

	main.style.setProperty("--scale", scale);

	// opacity
	let opacity = 1 - (y / (height / 1.5)) * 1;
	opacity = Math.round(opacity * 10) / 10;

	main.style.setProperty("--opacity", opacity);
};

// const handlePortfolioSection = (y, portfolio) => {
// 	const headingFill = height / 2;

// 	if (y <= headingFill) {
// 		let backgroundSize = (y / headingFill) * 125;

// 		portfolio.style.setProperty("--background-size", backgroundSize + "%");
// 		portfolio.style.setProperty("--tx", "0%");
// 	}
// };

// const handleAboutusSection = (y, aboutusText, aboutusText2) => {
// 	const aboutusTextEnd = height / 4;
// 	const aboutusText2End = height / 3;

// 	let x = Math.round((y / aboutusTextEnd) * 100);
// 	x = Math.min(100, x);

// 	aboutusText.style.setProperty("--x", x + "%");
// 	aboutusText2.style.setProperty("--x", 0 + "%");

// 	if (y >= aboutusTextEnd) {
// 		y = y - aboutusTextEnd;

// 		let x = Math.round((y / aboutusText2End) * 100);
// 		x = Math.min(100, x);

// 		aboutusText2.style.setProperty("--x", x + "%");
// 	}
// };

// const handlePortfolioHorizontalScroll = (y, portfolioHeight) => {
// 	let max = 105.5;

// 	if (width > 768) {
// 		max = 111;
// 	}
// 	if (width >= 820) {
// 		max = 110.5;
// 	}
// 	if (width >= 857) {
// 		max = 109.5;
// 	}
// 	if (width >= 946) {
// 		max = 108.5;
// 	}
// 	if (width >= 1056) {
// 		max = 107.5;
// 	}
// 	if (width >= 1196) {
// 		max = 106.5;
// 	}
// 	if (width >= 1376) {
// 		max = 105.5;
// 	}

// 	let x = (y / portfolioHeight) * max;
// 	x = Math.round(x * 100) / 100;
// 	x = Math.min(max, x);

// 	// console.log(x);

// 	portfolio.style.setProperty("--tx", x + "%");
// 	portfolio.style.setProperty("--background-size", "125%");
// };
