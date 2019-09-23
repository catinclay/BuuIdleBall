function Game(){}

Game.prototype.init = function(canvasWidth, canvasHeight, imageManager, soundManager){
	this.canvasWidth = canvasWidth;
	this.canvasHeight = canvasHeight;
	this.drawables = [];
	this.imageManager = imageManager;
	this.soundManager = soundManager;
	this.resourcePad = new ResourcePad(10, canvasWidth-10, 10, 30);
	this.drawables.push([this.resourcePad]);
	this.squares = [];
	let battleFieldLrtb = {l:10, r:canvasWidth-10, t:this.resourcePad.bottom + 10, b:500};
	this.battleField = new BattleField(this.squares, battleFieldLrtb);
	this.drawables.push([this.battleField]);
	this.controlPad = new ControlPad(this.resourcePad, this.battleField, 10, canvasWidth-10, this.battleField.bottom + 10, canvasHeight -10);
	this.drawables.push([this.controlPad]);
	this.drawables.push(this.squares);
	this.ball = new Ball(100, 100, this.squares, this.resourcePad, this.battleField, this.soundManager);
	this.drawables.push([this.ball]);
	this.errorCrosses = [];
	this.drawables.push(this.errorCrosses);
}

Game.prototype.update = function() {
	this.ball.update();
	for (var i = this.squares.length - 1; i >= 0; --i) {
		this.squares[i].update();
		if (this.squares[i].shouldDestroy()) {
			this.squares.splice(i, 1);
		}
	}
	this.controlPad.update();
}

Game.prototype.getDrawables = function() {
	return this.drawables;
}

Game.prototype.inputDownListener = function(touchX, touchY) {
	let touchPos = {x:touchX, y:touchY};
	if (this.battleField.containsPoint(touchX, touchY)) {
		let nearestSquare = this.findNearestSquare(touchPos, this.squares);
		if (nearestSquare != undefined) {
			let d = this.getDis(touchPos, nearestSquare);
			if (d <= 1.5 * nearestSquare.radius) {
				this.errorCrosses.push(new ErrorCross(touchX, touchY, this.soundManager));
				return;
			}
		}
		if (this.resourcePad.getMoney() >= 0.5) {
			this.battleField.insertSquare(new RedSquare(touchX, touchY, this.resourcePad));
			this.resourcePad.addMoney(-0.5);
		}
	} else if (this.controlPad.containsPoint(touchX, touchY)) {
		this.controlPad.handleClick(touchX, touchY);
	}
}

Game.prototype.findNearestSquare = function(ref, list) {
	let nearest = undefined;
	let nearestDis = undefined;
	for (var id in list) {
		let tar = list[id];
		if (!tar.isAlive()) continue;
		let dx = tar.x - ref.x;
		let dy = tar.y - ref.y;
		let dis = dx*dx + dy*dy;
		if (nearestDis == undefined || dis < nearestDis) {
			nearestDis = dis;
			nearest = tar;
		}
	}
	return nearest;
}


Game.prototype.getDis = function(ref, tar) {
	let dx = tar.x - ref.x;
	let dy = tar.y - ref.y;
	return Math.sqrt(dx*dx+dy*dy);
}

Game.prototype.inputMoveListener = function(touchX, touchY) {
}

Game.prototype.inputUpListener = function(touchX, touchY) {
}