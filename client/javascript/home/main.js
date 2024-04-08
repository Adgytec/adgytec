import { scrollAnimation } from "../module/scroll";
import { initCanvas } from "../module/canvas/canvas";

let contactUsElements = [];

window.addEventListener("load", () => {
	// get the main element
	const main = document.getElementsByTagName("main")[0];
	const portfolio = document.querySelector(".portfolio-container");
	const aboutus = document.querySelector(".aboutus-container");

	const videos = document.getElementsByTagName("video");

	for (let i = 0; i < videos.length; i++) {
		videos[i].playbackRate = 0.25;
	}

	initCanvas();
	scrollAnimation(main, portfolio, aboutus);

	// handeling form data
	const form = document.querySelector(".contact-us-form");
	// console.log(form);

	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		const honeypot = form.querySelector("input[name='other-service']");

		if (honeypot.value.length !== 0) {
			return;
		}

		const name = form.querySelector("input[name='name']");
		const email = form.querySelector("input[name='email']");
		const number = form.querySelector("input[name='mobile']");
		const service = form.querySelector("select[name='services']");
		const tellusmore = form.querySelector("textarea[name='more']");
		const button = form.querySelector("button[type='submit']");
		const formResponse = document.querySelector(".form-response");

		contactUsElements.push(name);
		contactUsElements.push(email);
		contactUsElements.push(number);
		contactUsElements.push(service);
		contactUsElements.push(tellusmore);
		contactUsElements.push(button);

		// console.log(name.value);
		// console.log(email.value);
		// console.log(number.value);
		// console.log(service.value);
		// console.log(tellusmore.value);

		await handleContactUs(
			name.value,
			email.value,
			number.value,
			service.value,
			tellusmore.value,
			button,
			formResponse,
			form
		);
	});
});

const handleContactUs = async (
	name,
	email,
	number,
	service,
	tellusmore,
	button,
	formResponse,
	form
) => {
	const p = formResponse.childNodes[1];
	contactUsElements.forEach((element) => {
		element.disabled = true;
	});
	button.innerHTML = "Submitting...";
	p.classList.remove("error");
	p.classList.remove("success");
	p.innerHTML = "";

	const reqBody = JSON.stringify({
		name,
		email,
		number,
		service,
		tellusmore,
	});

	const method = "POST";
	const url = "/contact-us";

	const res = await fetch(url, {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
		body: reqBody,
	});

	const serverResponse = await res.json();

	let { status, message } = serverResponse;

	button.innerHTML = "Submit";
	if (status === "error") {
		contactUsElements.forEach((element) => {
			element.disabled = false;
		});
		p.classList.add("error");
		window.location.href = "/reject";
	} else if (status === "successfull") {
		contactUsElements.forEach((element) => {
			element.disabled = false;
		});
		form.reset();
		p.classList.add("success");
		window.location.href = "/success";
	}
	p.innerHTML = message;
};
