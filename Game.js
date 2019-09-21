function Game(){}

Game.prototype.init = function(canvasWidth, canvasHeight, imageManager, soundManager){
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.drawables = [];
	this.imageManager = imageManager;
	this.soundManager = soundManager;
	this.squares = [];
	this.ball = new Ball(100, 100, this.squares, canvasWidth, canvasHeight, this.soundManager);
	this.drawables.push(this.ball);
}

Game.prototype.update = function() {
	this.ball.update();
	for (var i = this.squares.length - 1; i >= 0; --i) {
		if (this.squares[i].shouldDestroy()) {
			this.squares.splice(i, 1);
		}
	}
}

Game.prototype.getDrawables = function() {
	return this.drawables;
}

Game.prototype.inputDownListener = function(touchX, touchY) {
	var square = new Square(touchX, touchY);
	this.squares.push(square);
	this.drawables.push(square);
}

Game.prototype.inputMoveListener = function(touchX, touchY) {
}

Game.prototype.inputUpListener = function(touchX, touchY) {
}