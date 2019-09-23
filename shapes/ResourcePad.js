// Simple class example

function ResourcePad(left, right, top, bottom) {
	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;
	this.money = 3.5;
	this.moneyLine = 0;
	this.moneyGap = 5;
	this.digitAmountMap = [1000, 100, 10, 1];
	this.digitColorMap = ["#A500CC", "#33CCFF", "#00AA00", "#FF0000"];
}

ResourcePad.prototype.getMoney = function(money) {
	return this.money;
}

ResourcePad.prototype.setMoney = function(money) {
	this.money = money;
}

ResourcePad.prototype.addMoney = function(money) {
	this.money += money;
}

//A function for drawing the particle.
ResourcePad.prototype.drawToContext = function(theContext) {
	let moneyLine = this.left;
	let remainMoney = this.money;

	let hasHalf = Math.floor(this.money) != this.money;
	for(let digitIdx = 0; digitIdx < this.digitAmountMap.length; ++digitIdx) {
		theContext.beginPath();
		theContext.lineWidth = 4;
		let n = Math.floor(remainMoney / this.digitAmountMap[digitIdx]);
		remainMoney = remainMoney % this.digitAmountMap[digitIdx];
		theContext.strokeStyle = this.digitColorMap[digitIdx];
		for (let i = 0; i < n; ++i) {
			theContext.moveTo(moneyLine, this.top);
			theContext.lineTo(moneyLine, this.bottom);
		  	moneyLine += this.moneyGap;
		}
		theContext.stroke();
	}
	if (hasHalf) {
		theContext.strokeStyle = this.digitColorMap[this.digitColorMap.length - 1];
		theContext.moveTo(moneyLine, (this.top + this.bottom) /2);
		theContext.lineTo(moneyLine, this.bottom);
	  	moneyLine += this.moneyGap;
	  	theContext.stroke();
	}
	this.moneyLine = moneyLine;
    
}

ResourcePad.prototype.shouldDestroy = function() {
	return false;
}