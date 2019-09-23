function SquareFactoryControlPage(resourcePad, battleField, lrtb, color) {
	this.l = lrtb.l;
	this.r = lrtb.r;
	this.t = lrtb.t;
	this.b = lrtb.b;
	this.color = color;
	this.isShowing = false;
	this.squareFactoryCells = [];
	this.cellWidth = (this.r-this.l) / 4;
	this.cellHeight = (this.b - this.t)/3;
	this.resourcePad = resourcePad;
	this.battleField = battleField;
	this.squareDic = {
		"redSquare": {
			color : "#FF0000", 
			producePeriod : 10000,
			produce : function(x, y, resourcePad) {
				return new RedSquare(x, y, resourcePad);
			}
		},
	}
}

SquareFactoryControlPage.prototype.insertCell = function(squareLabel) {
	let cellCount = this.squareFactoryCells.length;
	let cellLeft = this.l + cellCount / 3 * this.cellWidth;
	let cellRight = cellLeft + this.cellWidth;
	let cellTop = this.t + cellCount % 3 * this.cellHeight;
	let cellBottom = cellTop + this.cellHeight;
	let cellLrtb = {l: cellLeft, r: cellRight, t: cellTop, b: cellBottom};
	this.squareFactoryCells.push(new SquareFactoryCell(cellLrtb, this.squareDic[squareLabel], this.battleField, this.resourcePad));
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
SquareFactoryControlPage.prototype.hitTest = function(hitX,hitY) {
	return this.isShowing && ((hitX > this.l)&&(hitX < this.r)&&(hitY > this.t)&&(hitY < this.b));
}

SquareFactoryControlPage.prototype.update = function() {
	for (var i in this.squareFactoryCells) {
		this.squareFactoryCells[i].update();
	}
}

SquareFactoryControlPage.prototype.handleClick = function(x, y) {
	if (!this.isShowing) return;
	for (var i in this.squareFactoryCells) {
		if (this.squareFactoryCells[i].hitTest(x, y)) {
			this.squareFactoryCells[i].handleClick(x, y);
		}
	}
}

//A function for drawing the particle.
SquareFactoryControlPage.prototype.drawToContext = function(theContext) {
	if (!this.isShowing) return;
	theContext.beginPath();
	theContext.fillStyle = this.color;
	theContext.fillRect(this.l, this.t, this.r-this.l, this.b - this.t);
	for (let i in this.squareFactoryCells) {
		this.squareFactoryCells[i].drawToContext(theContext);
	}
}

SquareFactoryControlPage.prototype.shouldDestroy = function(theContext) {
	return false;
}