class Circles {
	constructor(particles, startW, startH, endW, endH) {
		this.particles = particles;

		this.x = Math.floor(Math.random() * endW + startW);
		this.y = Math.floor(Math.random() * endH + startH);

		this.dx =
			Math.random() * (this.particles.speedX * 2) - this.particles.speedX;
		this.dy =
			Math.random() * (this.particles.speedY * 2) - this.particles.speedY;

		this.radius = Math.floor(
			Math.random() * this.particles.maxRadius + this.particles.minRadius
		);

		this.init();
	}
	init() {
		this.particles.ctx.save();

		this.particles.ctx.fillStyle = this.particles.color;
		this.particles.ctx.beginPath();
		this.particles.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		this.particles.ctx.fill();

		this.particles.ctx.restore();
	}
	updateCords() {
		let tempx = this.x + this.dx;
		let tempy = this.y + this.dy;

		if (
			tempx - this.radius <= 0 ||
			tempx + this.radius >= this.particles.width
		) {
			this.dx *= -1;
			tempx += this.dx;
		}

		if (
			tempy - this.radius <= 0 ||
			tempy + this.radius >= this.particles.height
		) {
			this.dy *= -1;
			tempy += this.dy;
		}

		this.x = tempx;
		this.y = tempy;
	}
	drawCircle() {
		this.particles.ctx.save();

		this.particles.ctx.fillStyle = this.particles.color;
		this.particles.ctx.beginPath();
		this.particles.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		this.particles.ctx.fill();

		this.particles.ctx.restore();
	}

	drawLine(ix, iy, jx, jy, alpha) {
		this.particles.ctx.save();

		this.particles.ctx.globalAlpha = alpha;
		this.particles.ctx.beginPath();
		this.particles.ctx.moveTo(ix, iy);
		this.particles.ctx.lineTo(jx, jy);
		this.particles.ctx.stroke();

		this.particles.ctx.restore();
	}
}

export class Particles {
	constructor(canvas, context, width, height) {
		this.canvas = canvas;
		this.ctx = context;

		this.width = width;
		this.height = height;

		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.ctx.strokeStyle = "hsl(194, 69%, 55%)";

		this.distance = Math.min(
			Math.floor(this.height / 15 + this.height / 32.48),
			75
		);

		this.speedX = 0.5;
		this.speedY = 0.4;

		this.minRadius = 1.5;
		this.maxRadius = 2;

		if (width < 640) {
			this.minRadius = 1;
			this.maxRadius = 1.5;

			this.distance = 45;
		}

		this.color = "hsl(26, 100%, 97%)";

		this.count = Math.floor(this.width / 12.8 + this.height / 6.3);

		this.circles = [];

		this.init();
	}
	init() {
		let tempCount = this.count / 4;
		let i = 0;

		let w2 = this.width / 2;
		let h2 = this.height / 2;

		let w = this.height;
		let h = this.height;

		let first = tempCount;
		let second = tempCount * 2;
		let third = tempCount * 3;
		let fourth = tempCount * 4;

		for (i; i < first; i++) {
			this.circles.push(new Circles(this, 0, 0, w2, h2));
		}

		for (i; i < second; i++) {
			this.circles.push(new Circles(this, w2, 0, w, h2));
		}

		for (i; i < third; i++) {
			this.circles.push(new Circles(this, 0, h2, w2, h));
		}

		for (i; i < fourth; i++) {
			this.circles.push(new Circles(this, w2, h2, w2, h2));
		}

		this.animate();
	}
	animate() {
		this.ctx.clearRect(0, 0, this.width, this.height);

		for (let i = 0; i < this.count; i++) {
			this.circles[i].updateCords();
			this.circles[i].drawCircle();

			let ix = this.circles[i].x;
			let iy = this.circles[i].y;

			for (let j = i; j < this.count; j++) {
				let jx = this.circles[j].x;
				let jy = this.circles[j].y;

				let dis = Math.hypot(jx - ix, jy - iy);

				if (dis <= this.distance) {
					let alpha = 1 - dis / this.distance;
					this.circles[j].drawLine(ix, iy, jx, jy, alpha);
				}
			}
		}
		requestAnimationFrame(this.animate.bind(this));
	}
	update(width, height) {
		this.width = width;
		this.height = height;

		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.distance = Math.min(
			Math.floor(this.height / 15 + this.height / 32.48),
			75
		);

		if (width < 640) {
			this.minRadius = 1;
			this.maxRadius = 1.5;

			this.distance = 45;
		}

		this.ctx.strokeStyle = "hsl(194, 69%, 55%)";
	}
}
