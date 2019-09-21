// Simple class example

function Square(posX, posY) {
	this.x = posX;
	this.y = posY;
	this.velX = 0;
	this.velY = 0;
	this.accelX = 0;
	this.accelY = 0;
	this.color = "#FF0000";
	this.radius = 10;
	this.pushPower = 3;
	this.maxHp = 3;
	this.hp = this.maxHp;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
Square.prototype.hitTest = function(hitX,hitY) {
	return((hitX > this.x - this.radius)&&(hitX < this.x + this.radius)&&(hitY > this.y - this.radius)&&(hitY < this.y + this.radius));
}

Square.prototype.hit = function(power) {
	if (this.hp <= 0) return;
	this.hp -= power;
}

//A function for drawing the particle.
Square.prototype.drawToContext = function(theContext) {
	theContext.fillStyle = this.color;
	theContext.fillRect(this.x - this.radius, this.y - this.radius + 2*(this.maxHp - this.hp)/this.maxHp * this.radius, 2*this.radius, 2*this.radius - 2*(this.maxHp - this.hp)/this.maxHp * this.radius);
	theContext.beginPath();
    theContext.rect(this.x - this.radius, this.y - this.radius, 2*this.radius, 2*this.radius);
  	theContext.lineWidth = 2;
  	theContext.strokeStyle = "#330000";
  	theContext.stroke();

}

Square.prototype.shouldDestroy = function() {
	return this.hp <= 0;
}