const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
//

const game = new Game(canvas);
//debugger;
game.drawStartScreen();

// add event listener click
const startGame = document.getElementById('button');
window.addEventListener('click', () => {
  debugger;
  game.clean();
  game.drawEverything();
  game.loop();
});
