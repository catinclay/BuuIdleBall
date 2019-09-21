// Simple class example

function BattleField(left, right, top, bottom) {
	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;
}

BattleField.prototype.containsPoint = function(x, y) {
	return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
}

//A function for drawing the particle.
BattleField.prototype.drawToContext = function(theContext) {
	theContext.fillStyle = "black";
	theContext.beginPath();
    theContext.rect(this.left, this.top, this.right - this.left, this.bottom - this.top);
    theContext.lineWidth = 1;
    theContext.strokeStyle = "#000000";
  	theContext.stroke();
}

BattleField.prototype.shouldDestroy = function() {
	return false;
}