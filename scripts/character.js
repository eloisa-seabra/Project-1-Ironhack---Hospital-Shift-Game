// Class Character
class Character {
  constructor(game, col, row) {
    this.game = game;
    this.col = col;
    this.row = row;
  }

  //methods to check if movement of the player is restricted by walls of the maze or not
  moveUp() {
    const nextRow = this.row - 1;
    const nextColumn = this.col;

    if (
      !this.game.maze.layout[nextRow][nextColumn] &&
      !this.game.maze.layout[nextRow][nextColumn + 1]
    ) {
      this.row = nextRow;
    }
  }
  moveRight() {
    const nextRow = this.row;
    const nextColumn = this.col + 1;

    if (
      !this.game.maze.layout[nextRow][nextColumn + 1] &&
      !this.game.maze.layout[nextRow + 1][nextColumn + 1]
    ) {
      this.col = nextColumn;
    }
  }
  moveDown() {
    const nextRow = this.row + 1;
    const nextColumn = this.col;
    if (
      !this.game.maze.layout[nextRow + 1][nextColumn] &&
      !this.game.maze.layout[nextRow + 1][nextColumn + 1]
    ) {
      this.row = nextRow;
    }
  }
  moveLeft() {
    const nextRow = this.row;
    const nextColumn = this.col - 1;

    if (
      !this.game.maze.layout[nextRow][nextColumn] &&
      !this.game.maze.layout[nextRow + 1][nextColumn]
    ) {
      this.col = nextColumn;
    }
  }

  // Check collision with the borders of the canvas
  borderCollision() {
    //check boundaries for borders
    if (this.col < 0) {
      return (this.col = 0);
    } else if (this.col > COUNT_COLUMN - 2) {
      return (this.col = COUNT_COLUMN - 2);
    } else if (this.row < 0) {
      return (this.row = 0);
    } else if (this.row > COUNT_ROW - 1) {
      return (this.row = COUNT_ROW - 1);
    }
  }

  drawPlayer() {
    const doctor = new Image();
    const ctx = this.game.context;
    doctor.src = 'collection-professional-doctors/doctors.png';

    doctor.addEventListener('load', () => {
      ctx.drawImage(
        doctor,
        this.col * SQUARE_SIZE,
        this.row * SQUARE_SIZE,
        SQUARE_SIZE * 2,
        SQUARE_SIZE * 2
      );
    });
    ctx.drawImage(
      doctor,
      this.col * SQUARE_SIZE,
      this.row * SQUARE_SIZE,
      SQUARE_SIZE * 2,
      SQUARE_SIZE * 2
    );
  }
}
