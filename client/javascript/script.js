// const canvas = document.querySelector("#canvas1");
const count = 30;

const colors = ["blue", "cyan", "lightblue", "yellow"];
let len = 4;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let width = canvas.width;
let height = canvas.height;

// const ctx = canvas.getContext("2d");

const distance = 75;
const speedY = 0.4;
const speedX = 0.6;
const minRadius = 2;
const maxRadius = 2.5;

window.addEventListener("resize", () => {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;

	width = canvas.width;
	height = canvas.height;

	ctx.strokeStyle = "hsl(194, 69%, 55%)";
	// init();
});

class Circles {
	constructor() {
		this.x = Math.floor(Math.random() * width);
		this.y = Math.floor(Math.random() * height);

		this.dx = Math.random() * speedX - speedX;
		this.dy = Math.random() * speedY - speedY;

		this.color = "hsl(26, 100%, 97%)";

		this.radius = Math.floor(Math.random() * maxRadius + minRadius);

		this.init();
	}
	init() {
		ctx.save();

		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();

		ctx.restore();
	}
	updateCords() {
		let tempx = this.x + this.dx;
		let tempy = this.y + this.dy;

		if (tempx - this.radius <= 0 || tempx + this.radius >= width) {
			this.dx *= -1;
			tempx += this.dx;
		}

		if (tempy - this.radius <= 0 || tempy + this.radius >= height) {
			this.dy *= -1;
			tempy += this.dy;
		}

		this.x = tempx;
		this.y = tempy;
	}
	drawCircle() {
		ctx.save();

		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();

		ctx.restore();
	}

	drawLine(ix, iy, jx, jy, alpha) {
		ctx.save();

		ctx.globalAlpha = alpha;
		ctx.beginPath();
		ctx.moveTo(ix, iy);
		ctx.lineTo(jx, jy);
		ctx.stroke();

		ctx.restore();
	}
}

let particles = [];
function init() {
	ctx.strokeStyle = "hsl(194, 69%, 55%)";
	particles = [];
	for (let i = 0; i < count; i++) {
		particles.push(new Circles());
	}
}

init();

function animate() {
	ctx.clearRect(0, 0, width, height);

	for (let i = 0; i < count; i++) {
		particles[i].updateCords();
		particles[i].drawCircle();

		let ix = particles[i].x;
		let iy = particles[i].y;

		for (let j = i; j < count; j++) {
			let jx = particles[j].x;
			let jy = particles[j].y;

			let dis = Math.hypot(jx - ix, jy - iy);

			if (dis <= distance) {
				let alpha = 1 - dis / distance;
				particles[j].drawLine(ix, iy, jx, jy, alpha);
			}
		}
	}

	requestAnimationFrame(animate);
}

animate();
