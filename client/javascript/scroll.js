{
	let width = window.innerWidth;
	let height = window.innerHeight;

	const logo = document.querySelector(".logo");
	const main = document.getElementsByTagName("main")[0];
	const heroTimes = 2.5;

	main.style.setProperty("--times", heroTimes);

	window.addEventListener("resize", () => {
		width = window.innerWidth;
		height = window.innerHeight;
	});

	window.addEventListener("scroll", (e) => {
		let y = scrollY;

		// hero section height * heroTimes;
		const heroHeight = height * heroTimes;
		const scaleAmount = 2;

		if (y <= heroHeight) {
			let scale = 1 + (y / heroHeight) * scaleAmount;
			scale = Math.round(scale * 10) / 10;

			logo.style.setProperty("--scale", scale);

			let translate = (y / heroHeight) * (width - 200);

			logo.style.setProperty("--translate", translate + "px");
		}
	});
}
