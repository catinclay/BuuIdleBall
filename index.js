var game = new Game();
var gameEngine = new GameEngine();
var imageManager = new ImageManager();
var soundManager = new SoundManager();
gameEngine.init(game, imageManager, soundManager, 60);

soundManager.registerSound({name:'hitSound', src:'sounds/hitSound.mp3'});
soundManager.registerSound({name:'errorSound', src:'sounds/errorSound.mp3'});

var loadPromises = [
	imageManager.registerImage({name:'flightImage', src:'image/flightIcon.png'})
];

Promise.all(loadPromises).then(gameEngine.start());

