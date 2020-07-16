// sound of coughing
const drycoughingSoundUrl =
  'https://raw.githubusercontent.com/coughresearch/Cough-data/master/Dry_cough/man%20cough%20dry%20inhale%20zpasplat.m4a';
const drycoughSound = new Audio(drycoughingSoundUrl);

class Patients {
  constructor(game, col, row) {
    this.game = game;
    this.col = col;
    this.row = row;
    this.setRandomPosition();
  }

  // random position of patients appearing in the maze recognizing wall borders and canvas borders
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

  // to check position of player and patients array - once the same, it will remove the patient from the array and will increase score
  patientsCollision() {
    if (
      this.game.player.row === this.row &&
      this.game.player.col === this.col
    ) {
      this.game.patientsArray.splice(this.game.patientsArray.indexOf(this), 1);
      this.game.score.score++;
      drycoughSound.play();
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
