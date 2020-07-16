class Medication {
  constructor(game, col, row) {
    this.game = game;
    this.col = col;
    this.row = row;
    this.setRandomPosition();
  }
  setRandomPosition() {
    this.col = Math.floor(Math.random() * 20);
    this.row = Math.floor(Math.random() * 20);
    this.medsInsideCanvas();
    this.collisionWithMaze();
  }

  medsInsideCanvas() {
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
      this.game.score.score++;
    }
  }

  drawMeds() {
    const ctx = this.game.context;
    const medsImage = new Image();
    medsImage.src = 'images/patients.png';

    medsImage.addEventListener('load', () => {
      ctx.drawImage(
        medsImage,
        this.col * SQUARE_SIZE,
        this.row * SQUARE_SIZE,
        SQUARE_SIZE * 2,
        SQUARE_SIZE * 2
      );
    });
    ctx.drawImage(
      medsImage,
      this.col * SQUARE_SIZE,
      this.row * SQUARE_SIZE,
      SQUARE_SIZE * 2,
      SQUARE_SIZE * 2
    );
  }
}
