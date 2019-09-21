function Game(){}

Game.prototype.init = function(canvasWidth, canvasHeight, imageManager, soundManager){
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.drawables = [];
	this.imageManager = imageManager;
	this.soundManager = soundManager;
	this.resourcePad = new ResourcePad(10, canvasWidth-10, 10, 30);
	this.drawables.push(this.resourcePad);
	this.battleField = new BattleField(10, canvasWidth-10, this.resourcePad.bottom + 10, 500);
	this.drawables.push(this.battleField);
	this.controlPad = new ControlPad(10, canvasWidth-10, this.battleField.bottom + 10, canvasHeight -10);
	this.drawables.push(this.controlPad);

	this.squares = [];
	this.ball = new Ball(100, 100, this.squares, this.resourcePad, this.battleField, this.soundManager);
	this.drawables.push(this.ball);
}

Game.prototype.update = function() {
	this.ball.update();
	for (var i = this.squares.length - 1; i >= 0; --i) {
		this.squares[i].update();
		if (this.squares[i].shouldDestroy()) {
			this.squares.splice(i, 1);
		}
	}
}

Game.prototype.getDrawables = function() {
	return this.drawables;
}

Game.prototype.inputDownListener = function(touchX, touchY) {
	if (this.battleField.containsPoint(touchX, touchY)) {
		if (this.resourcePad.getMoney() >= 0.5) {
			var square = new Square(touchX, touchY, this.resourcePad);
			this.squares.push(square);
			this.drawables.push(square);
			this.resourcePad.addMoney(-0.5);
		}
	} else if (this.controlPad.containsPoint(touchX, touchY)) {
		this.controlPad.handleClick(touchX, touchY);
	}
}

Game.prototype.inputMoveListener = function(touchX, touchY) {
}

Game.prototype.inputUpListener = function(touchX, touchY) {
}