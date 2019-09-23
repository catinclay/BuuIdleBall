function SquareFactoryCell(lrtb, squareInfo, battleField, resourcePad) {
	this.l = lrtb.l;
	this.r = lrtb.r;
	this.t = lrtb.t;
	this.b = lrtb.b;
	this.color = "#FFFFFF";
	this.margin = 4;
	this.battleField = battleField;
	this.resourcePad = resourcePad;

	// the attributes for this cell
	this.squareInfo = squareInfo;
	this.squareLeft = this.l + this.margin + 5;
	this.squareWidth = 20;
	this.squareTop = (this.b + this.t)/2 - 10;
	this.squareHeight = 20;

	// The spec for the progress bar
	this.barLeft = this.l + this.margin + 30;
	this.barTop = this.t + this.margin + 25 + 8;
	this.barWidth = this.r - this.barLeft - this.margin - 5;
	this.barHeight = 5;

	// The spec for producing this square
	this.producePeriod = squareInfo.producePeriod;
	this.produceSpeed = 0;
	this.produceCounter = 0;

	// The purchase UI related
	this.speedLabelX = this.squareLeft + this.squareWidth+10;
	this.speedLabelY = this.t+this.margin+10;

	// The purchase related
	this.speedPurchaseCost = 5;
	this.purchaseLvl = 0;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
SquareFactoryCell.prototype.hitTest = function(hitX,hitY) {
	return((hitX > this.l)&&(hitX < this.r)&&(hitY > this.t)&&(hitY < this.b));
}

SquareFactoryCell.prototype.update = function() {
	this.produceCounter += this.produceSpeed;
	if (this.produceCounter >= this.producePeriod) {
		this.produceCounter -= this.producePeriod;
		let randX = Math.random() * (this.battleField.right - this.battleField.left) + this.battleField.left;
		let randY = Math.random() * (this.battleField.bottom - this.battleField.top) + this.battleField.top;
		this.battleField.insertSquare(this.squareInfo.produce(randX, randY, this.resourcePad));
	}
}

SquareFactoryCell.prototype.handleClick = function(x, y) {
	if (this.speedPurchaseCost <= this.resourcePad.getMoney()) {
		this.resourcePad.addMoney(-this.speedPurchaseCost);
		if (this.purchaseLvl == 0) {
			this.produceSpeed = 25;
			this.speedPurchaseCost = 10;
		} else {
			this.produceSpeed = Math.floor(this.produceSpeed * 1.35);
			this.speedPurchaseCost = Math.floor(this.speedPurchaseCost * (1+this.purchaseLvl*0.1));
		}
		++this.purchaseLvl;
	}
}

//A function for drawing the particle.
SquareFactoryCell.prototype.drawToContext = function(theContext) {
	// The backgrond
	theContext.beginPath();
	theContext.fillStyle = this.color;
	theContext.rect(this.l + this.margin, this.t + this.margin, this.r-this.l - this.margin * 2, this.b - this.t - this.margin * 2);
	theContext.fill();
	theContext.strokeStyle = "#000000";
  	theContext.stroke();

  	// The square on left side
  	theContext.beginPath();
	theContext.fillStyle = this.squareInfo.color;
	theContext.rect(this.squareLeft, this.squareTop, this.squareWidth, this.squareHeight);
	theContext.fill();
	theContext.strokeStyle = "#000000";
  	theContext.stroke();

  	// The speed Label
  	theContext.beginPath();
  	theContext.fillStyle = "#000000";
  	theContext.font = "8px Arial";
	theContext.fillText("SPEED " + this.produceSpeed, this.speedLabelX, this.speedLabelY); 

	// The speed purchase costs label
	if (this.speedPurchaseCost <= this.resourcePad.getMoney()) {
		theContext.fillStyle = "#000000";
	} else {
		theContext.fillStyle = "#AAAAAA";
	}
  	theContext.font = "18px Arial";
	theContext.fillText("$" + this.speedPurchaseCost, this.speedLabelX, this.speedLabelY + 18); 

  	// The progress bar content inside the progress bar
  	theContext.beginPath();
  	theContext.fillStyle = this.squareInfo.color;
	theContext.fillRect(this.barLeft, this.barTop, this.barWidth * this.produceCounter/this.producePeriod, this.barHeight);


  	// The progress bar boundary in the bottom
	theContext.beginPath();
	theContext.rect(this.barLeft, this.barTop, this.barWidth, this.barHeight);
	theContext.strokeStyle = "#000000";
	theContext.lineWidth = 1;
  	theContext.stroke();
}

SquareFactoryCell.prototype.shouldDestroy = function(theContext) {
	return false;
}