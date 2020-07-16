const coughSound = new Audio(
  'https://raw.githubusercontent.com/coughresearch/Cough-data/master/Dry_cough/man%20coughing%20close%20and%20dry%20cough%20zapsplat.m4a'
);

//sound for losing

//sound for reaching patient

//sound for picking up object

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.maze = new Maze(this);
    this.setKeyBindings();
    this.patientsArray = [];
    this.generatePatients();
    this.player = new Character(this, 18, 18);

    // timer to manage patients creation
    this.createPatientTimer = 0;
    this.createPatientInterval = 8000;

    this.timer = new Timer(this);
    // this.arrayScore = [];
    this.score = new Score(this);
    this.running = true;
  }

  runLogic(timestamp) {
    this.player.borderCollision();

    for (let patient of this.patientsArray) {
      patient.patientsCollision();
      if (
        this.patientsArray.length === 0 ||
        this.createPatientTimer < timestamp - this.createPatientInterval
      ) {
        //console.log(patientsArray.length);
        this.createPatientTimer = timestamp;
        this.generatePatients();
        //coughSound.play();
      }
    }
    // create condition
    //debugger;
    //const timeFrame = Math.floor(timestamp / 1000);
    if (this.score >= 25 && Math.floor(timestamp / 1000 / 6) === 10) {
      console.log(`You saved the day!`);
      //this.win()
    } else if (Math.floor(timestamp / 1000 / 6) === 10) {
      this.lose();
      console.log(`You lose. Covid wins`);
    }
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawEverything(timestamp) {
    this.maze.paint();
    this.player.drawPlayer();
    this.timer.paint(timestamp);
    this.score.paint();
    for (let patient of this.patientsArray) {
      patient.drawPatients();
    }
  }

  // Create more patients - NOT WORKING
  generatePatients() {
    for (let i = 0; i < 3; i++) {
      const patient = new Patients(this, 3, 3);
      this.patientsArray.push(patient);
    }
  }

  setKeyBindings() {
    window.addEventListener('keydown', event => {
      event.preventDefault();
      switch (event.keyCode) {
        case 37:
          this.player.moveLeft();
          break;
        case 38:
          this.player.moveUp();
          break;
        case 39:
          this.player.moveRight();

          break;
        case 40:
          this.player.moveDown();
          break;
      }
    });
  }

  win() {
    this.running = false;
    this.paintWin();
  }

  paintWin() {
    this.clean();
    const context = this.game.context;

    context.save();

    context.fillStyle = 'lightblue';

    context.fillRect(x, y, this.canvas.width, this.canvas.height);

    context.restore();
  }

  lose() {
    this.running = false;
    this.paintLose();
  }

  paintLose() {
    debugger;
    this.clean();
    const ctx = this.context;
    const gameover = new Image();
    gameover.src = 'images/gameover-covid.jpg';
    ctx.drawImage(gameover, 0, 0, this.canvas.width, this.canvas.height);
  }

  loop(timestamp) {
    // Run logic
    this.runLogic(timestamp);

    if ((this.running = true)) {
      this.clean();
      this.drawEverything(timestamp);
      window.requestAnimationFrame(timestamp => this.loop(timestamp));
    }
  }
}
