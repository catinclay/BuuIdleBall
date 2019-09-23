// Simple class example

function ControlPad(resourcePad, battleField, left, right, top, bottom) {
	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;
	this.currentPage = 0;
	this.pageColors = ["#77FFCC88", "#66FF6688"];
	this.tabsCount = 2;
	this.tabWidth = (this.right - this.left) / this.tabsCount;
	this.tabHeight = (this.bottom - this.top) / 6;
	this.controlPages = [];
	this.resourcePad = resourcePad;
	this.battleField = battleField;
	this.init();
}

ControlPad.prototype.init = function() {
	for (let i = 0; i < this.tabsCount; ++i) {
		let controlPage = new SquareFactoryControlPage(this.resourcePad, this.battleField, {l:this.left, r:this.right, t:this.top + this.tabHeight, b:this.bottom}, this.pageColors[i]);
		this.controlPages.push(controlPage);
	}

	// Init Square factory pages
	this.controlPages[0].insertCell("redSquare");
	this.controlPages[0].isShowing = true;
}

ControlPad.prototype.update = function() {
	for (var i in this.controlPages) {
		this.controlPages[i].update();
	}
}

ControlPad.prototype.containsPoint = function(x, y) {
	return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
}

ControlPad.prototype.handleClick = function(x, y) {
	// Change tab
	if (y <= this.top + this.tabHeight) {
		this.currentPage = Math.floor((x - this.left) / this.tabWidth);
		for (let i = 0; i < this.tabsCount; ++i) {
			this.controlPages[i].isShowing = i == this.currentPage;
		}
		return;
	}
	this.controlPages[this.currentPage].handleClick(x, y);

}

//A function for drawing the particle.
ControlPad.prototype.drawToContext = function(theContext) {
	// The outside boundary
	theContext.fillStyle = "black";
	theContext.beginPath();
    theContext.rect(this.left, this.top, this.right - this.left, this.bottom - this.top);
    theContext.lineWidth = 2;
    theContext.strokeStyle = "#000000";
  	theContext.stroke();

  	// The tabs
  	for (var i = 0; i < this.tabsCount; ++i) {
  		theContext.beginPath();
  		if (i == this.currentPage) {
			theContext.moveTo(this.left + i * this.tabWidth, this.top + this.tabHeight);
			theContext.lineTo(this.left + i * this.tabWidth, this.top);
			theContext.lineTo(this.left + (i+1) * this.tabWidth, this.top);
			theContext.lineTo(this.left + (i+1) * this.tabWidth, this.top + this.tabHeight);
  		} else {
		    theContext.rect(this.left + i * this.tabWidth, this.top, this.tabWidth, this.tabHeight);		    
  		} 
  		theContext.fillStyle = this.pageColors[i];
	    theContext.fillRect(this.left + i * this.tabWidth, this.top , this.tabWidth, this.tabHeight);
  		theContext.strokeStyle = "#000000";
	  	theContext.stroke();
  	}

  	// The page
  	this.controlPages[this.currentPage].drawToContext(theContext);
}

ControlPad.prototype.shouldDestroy = function() {
	return false;
}