// Simple class example

function ResourcePad(left, right, top, bottom) {
	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;
	this.money = 5.5;
	this.moneyLine = 0;
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
	theContext.beginPath();
	while(remainMoney >= 0.5) {
		if (remainMoney >= 1) {
			theContext.moveTo(moneyLine, this.top);
			theContext.lineTo(moneyLine, this.bottom);
		  	moneyLine += 7;
		  	remainMoney--;
		} else if (remainMoney >= 0.5) {
			theContext.moveTo(moneyLine, (this.top + this.bottom) /2);
			theContext.lineTo(moneyLine, this.bottom);
		  	moneyLine += 7;
		  	remainMoney-=0.5;
		}
	}
	this.moneyLine = moneyLine;
    theContext.strokeStyle = "#FF0000";
    theContext.lineWidth = 4;
  	theContext.stroke();
}

ResourcePad.prototype.shouldDestroy = function() {
	return false;
}