// Simple class example

function ErrorCross(posX, posY, soundManager) {
		this.x = posX;
		this.y = posY;
		this.color = "#FF0000";
		this.radius = 8;
		this.destroyCounter = 30;
		soundManager.play("errorSound");
}


//A function for drawing the particle.
ErrorCross.prototype.drawToContext = function(theContext) {
	if (this.destroyCounter >= 0) {
		--this.destroyCounter;
	}
	theContext.beginPath();
	theContext.lineWidth = 3;
	theContext.moveTo(this.x - this.radius, this.y - this.radius);
	theContext.lineTo(this.x + this.radius, this.y + this.radius);
	theContext.moveTo(this.x + this.radius, this.y - this.radius);
	theContext.lineTo(this.x - this.radius, this.y + this.radius);
  	theContext.stroke();
}

ErrorCross.prototype.shouldDestroy = function() {
	return this.destroyCounter <= 0;
}
