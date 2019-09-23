// Simple class example

function BattleField(squares, lrtb) {
	this.squares = squares;
	this.left = lrtb.l;
	this.right = lrtb.r;
	this.top = lrtb.t;
	this.bottom = lrtb.b;
}

BattleField.prototype.containsPoint = function(x, y) {
	return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
}

BattleField.prototype.insertSquare = function(square) {
	this.squares.push(square);
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