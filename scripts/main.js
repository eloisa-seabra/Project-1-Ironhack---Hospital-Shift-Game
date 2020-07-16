const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
//

const game = new Game(canvas);

game.drawStartScreen();

// add event listener click to button
const startGame = document.getElementById('button');
window.addEventListener('click', () => {
  game.clean();
  game.drawEverything();
  game.loop();
});
