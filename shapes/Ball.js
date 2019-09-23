// Simple class example

function Ball(posX, posY, squares, resourcePad, battleField, soundManager) {
	this.leftBound = battleField.left;
	this.rightBound = battleField.right;
	this.topBound = battleField.top;
	this.bottomBound = battleField.bottom;
	this.squares = squares;
	this.resourcePad = resourcePad;
	this.x = posX;
	this.y = posY;
	this.velX = 1;
	this.velY = 0;
	this.accelX = 0;
	this.accelY = 0;
	this.color = "#00BB00";
	this.radius = 10;
	this.target = undefined;
	this.accel = 0.175;
	this.power = 1;
	this.stunCounter = 0;
}

Ball.prototype.update = function() {
	if (this.x + this.radius >= this.rightBound && this.velX >= 0 || this.x - this.radius <= this.leftBound && this.velX <= 0) {
		this.velX *= -1;
	}
	if (this.y + this.radius >= this.bottomBound && this.velY >= 0 || this.y - this.radius <= this.topBound && this.velY <= 0) {
		this.velY *= -1
	}


	var nearest = this.findNearest(this.squares);
	if (nearest != undefined) {
		let dx = nearest.x - this.x;
		let dy = nearest.y - this.y;
		let dx2dy2 = dx*dx + dy*dy;
		if (dx2dy2 <= (this.radius + nearest.radius) * (this.radius + nearest.radius)) {
			let isHit = false;
			if (Math.abs(dx) < Math.abs(dy)) {
				if (this.velY * dy >= 0) {
					isHit = true;
					this.velY *= -1;
				}
			} else {
				if (this.velX * dx >= 0) {
					isHit = true;
					this.velX *= -1;
				}
			}
			if (isHit) {
				this.stunCounter = 25;
				let vx2vy2 = this.velX * this.velX + this.velY * this.velY;
				let k = nearest.pushPower/Math.sqrt(vx2vy2);
				this.velX *= k;
				this.velY *= k;
				nearest.hit(this.power);
				soundManager.play("hitSound");
			}
			this.target = undefined;
		}
	}
	
	if (this.stunCounter >= 0){
		this.stunCounter--;
	}

	// Find nearest squre if no target.
	if (this.target == undefined && this.stunCounter <= 0) {
		this.target = nearest;
	}
	if (this.target != undefined) {
		if (!this.target.isAlive()) {
			this.target = undefined;
		} else if (this.stunCounter <= 0){
			let dx = this.target.x - this.x;
			let dy = this.target.y - this.y;
			let k = this.accel / Math.sqrt(dx * dx + dy * dy);
			this.velX += dx * k;
			this.velY += dy * k;
		}
	} 
	if (this.velX * this.velX + this.velY * this.velY > 1) {
		this.velX *= 0.99;
		this.velY *= 0.99;
	}
	this.x += this.velX;
	this.y += this.velY;
}

Ball.prototype.findNearest = function(list) {
	var nearest = undefined;
	var nearestDis = undefined;
	for (var id in list) {
		let tar = list[id];
		if (!tar.isAlive()) continue;
		let dx = tar.x - this.x;
		let dy = tar.y - this.y;
		let dis = dx*dx + dy*dy;
		if (nearestDis == undefined || dis < nearestDis) {
			nearestDis = dis;
			nearest = tar;
		}
	}
	return nearest;
}


//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
Ball.prototype.hitTest = function(hitX,hitY) {
	return((hitX > this.x - this.radius)&&(hitX < this.x + this.radius)&&(hitY > this.y - this.radius)&&(hitY < this.y + this.radius));
}

//A function for drawing the particle.
Ball.prototype.drawToContext = function(theContext) {
	theContext.beginPath();
	theContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	theContext.fillStyle = this.color;
	theContext.fill();
	theContext.lineWidth = 2;
	theContext.stroke();
}

Ball.prototype.shouldDestroy = function() {
	return false;
}