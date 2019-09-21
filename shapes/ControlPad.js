// Simple class example

function ControlPad(left, right, top, bottom) {
	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;
	this.currentPage = 0;
	this.tabsCount = 2;
	this.tabWidth = (this.right - this.left) / this.tabsCount;
	this.tabHeight = (this.bottom - this.top) / 6;
	this.pageColors = ["#77FFCC88", "#66FF6688"];
}

ControlPad.prototype.containsPoint = function(x, y) {
	return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
}

ControlPad.prototype.handleClick = function(x, y) {
	// Change tab
	if (y <= this.top + this.tabHeight) {
		this.currentPage = Math.floor((x - this.left) / this.tabWidth);
	}
}

//A function for drawing the particle.
ControlPad.prototype.drawToContext = function(theContext) {
  	// Background color
	theContext.fillStyle = this.pageColors[this.currentPage];
    theContext.fillRect(this.left, this.top + this.tabHeight, this.right - this.left, this.bottom - this.top - this.tabHeight);

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

  	// draw pages based on selected tab
}

ControlPad.prototype.shouldDestroy = function() {
	return false;
}