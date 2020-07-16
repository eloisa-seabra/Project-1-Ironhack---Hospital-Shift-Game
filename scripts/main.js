//const canvas = document.querySelector('canvas');
//const context = canvas.getContext('2d');

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const game = new Game(canvas);
game.drawEverything();
game.loop();

// I think I might need game.loop for timer
//game.loop();
