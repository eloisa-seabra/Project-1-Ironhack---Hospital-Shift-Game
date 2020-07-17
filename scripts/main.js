const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
//

const game = new Game(canvas);

game.drawStartScreen();

// add event listener click to button
const startGame = document.getElementById('start');
startGame.addEventListener('click', () => {
  game.clean();
  game.drawEverything();
  game.gameStarted = true;
  game.loop();
});

const restartGame = document.getElementById('restart');
restartGame.addEventListener('click', () => {
  game.restart();
  backMusic.play();
  winningMusic.pause();
  losingMusic.pause();
});

//game.loop;
//game.drawStartScreen();
