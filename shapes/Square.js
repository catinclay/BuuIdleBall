// Simple class example

function Square(posX, posY, resourcePad) {
	this.x = posX;
	this.y = posY;
	this.velX = 0;
	this.velY = 0;
	this.accelX = 0;
	this.accelY = 0;
	this.accel = 0.2;
	this.color = "#FF0000";
	this.lineWidth = 2;
	this.radius = 10;
	this.pushPower = 10;
	this.maxHp = 3;
	this.hp = this.maxHp;
	this.cost = 0.5;
	this.bounty = 1;
	this.resourcePad = resourcePad;
	this.goingToBeDestroyed = false;
}

Square.prototype.update = function() {
	if (this.shouldDestroy()) return; 
	if (this.isAlive()) return;
	let tx = this.resourcePad.moneyLine;
	let ty = (this.resourcePad.top + this.resourcePad.bottom) / 2;
	let dx = tx - this.x;
	let dy = ty - this.y;
	let dx2dy2 = dx*dx+dy*dy;
	let vx2vy2 = this.velX * this.velX + this.velY * this.velY;
	if (dx2dy2 < vx2vy2) {
		this.resourcePad.addMoney(this.bounty);
		this.goingToBeDestroyed = true;
	} else {
		let k = this.accel / Math.sqrt(dx2dy2);
		this.velX += dx * k;
		this.velY += dy * k;
		this.x += this.velX;
		this.y += this.velY;
	}
}

Square.prototype.hit = function(power) {
	if (!this.isAlive()) return;
	this.hp -= power;
	if (!this.isAlive()) {
		this.radius = 3;
		this.lineWidth = 1;
	}
}

//A function for drawing the particle.
Square.prototype.drawToContext = function(theContext) {
	theContext.fillStyle = this.color;
	if (this.isAlive()){
		theContext.fillRect(this.x - this.radius, this.y - this.radius + 2*(this.maxHp - this.hp)/this.maxHp * this.radius, 2*this.radius, 2*this.radius - 2*(this.maxHp - this.hp)/this.maxHp * this.radius);
	} else {
		theContext.fillRect(this.x - this.radius, this.y - this.radius , 2*this.radius, 2*this.radius);
	} 
	theContext.beginPath();
    theContext.rect(this.x - this.radius, this.y - this.radius, 2*this.radius, 2*this.radius);
  	theContext.lineWidth = this.lineWidth;
  	theContext.strokeStyle = "#330000";
  	theContext.stroke();
}



Square.prototype.isAlive = function() {
	return this.hp > 0;
}

Square.prototype.shouldDestroy = function() {
	return this.goingToBeDestroyed;
}