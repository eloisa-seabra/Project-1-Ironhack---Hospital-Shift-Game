// All of this componets know how to operate, but do not know when to operate. They have: runLogic() method, draw(), detectCollision(), etc.
class Patients {
  constructor(game, col, row) {
    this.game = game;
    this.col = col;
    this.row = row;
    this.setRandomPosition();
  }

  setRandomPosition() {
    this.col = Math.floor(Math.random() * 20);
    this.row = Math.floor(Math.random() * 20);
    this.patientInsideCanvas();
    this.collisionWithMaze();
  }

  patientInsideCanvas() {
    if (this.col === 19 || this.row === 19) {
      this.setRandomPosition();
    }
  }

  collisionWithMaze() {
    const maze = this.game.maze.layout;

    if (
      maze[this.row][this.col] ||
      maze[this.row][this.col + 1] ||
      maze[this.row + 1][this.col] ||
      maze[this.row + 1][this.col + 1]
    ) {
      //one of the corners of our patient is colliding with the maze!
      this.setRandomPosition();
    }
  }

  patientsCollision() {
    if (
      this.game.player.row === this.row &&
      this.game.player.col === this.col
    ) {
      this.game.patientsArray.splice(this.game.patientsArray.indexOf(this), 1);
      this.game.score.score++;
    }
  }

  drawPatients() {
    const ctx = this.game.context;
    const patientImage = new Image();
    patientImage.src = 'images/patients.png';

    patientImage.addEventListener('load', () => {
      ctx.drawImage(
        patientImage,
        this.col * SQUARE_SIZE,
        this.row * SQUARE_SIZE,
        SQUARE_SIZE * 2,
        SQUARE_SIZE * 2
      );
    });
    ctx.drawImage(
      patientImage,
      this.col * SQUARE_SIZE,
      this.row * SQUARE_SIZE,
      SQUARE_SIZE * 2,
      SQUARE_SIZE * 2
    );
  }
}
