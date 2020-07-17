// coughing sound
const coughingSoundUrl =
  'https://raw.githubusercontent.com/coughresearch/Cough-data/master/Dry_cough/Man%20cough%20x5%20dry%20chesty%20zapsplat.m4a';
const coughSound = new Audio(coughingSoundUrl);
coughSound.volume = 0.4;

// sound for this.running game
const backgroundMusicUrl =
  'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/BoxCat_Games/Nameless_The_Hackers_RPG_Soundtrack/BoxCat_Games_-_11_-_Assignment.mp3';
const backMusic = new Audio(backgroundMusicUrl);
backMusic.volume = 0.3;

//sound for winning
const winningMusicUrl =
  'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/BoxCat_Games/Nameless_The_Hackers_RPG_Soundtrack/BoxCat_Games_-_14_-_Battle_End.mp3';
const winningMusic = new Audio(winningMusicUrl);
winningMusic.volume = 0.3;

// sound for losing and volume
const losingMusicUrl =
  'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/BoxCat_Games/Nameless_The_Hackers_RPG_Soundtrack/BoxCat_Games_-_26_-_Defeat.mp3';
const losingMusic = new Audio(losingMusicUrl);
losingMusic.volume = 1;

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.maze = new Maze(this);
    this.setKeyBindings();
    this.patientsArray = [];
    this.generatePatients();
    this.player = new Character(this, 18, 18);
    this.gameStarted = false;
    this.gameStartingTime = 0;

    // timer to manage patients creation
    this.createPatientTimer = 0;
    this.createPatientInterval = 7000;

    this.timer = new Timer(this);
    this.score = new Score(this);
    this.running = true;
  }

  drawStartScreen() {
    this.clean();

    const context = this.context;

    context.fillStyle = 'white';

    context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    context.save();
    const stop = new Image();
    stop.src = 'images/stop.jpg';
    stop.addEventListener('load', () => {
      context.drawImage(stop, 145, -40, 500, 300);
    });

    context.fillStyle = '#004d70';

    context.font = '130px sans-serif';
    context.fillText('Hospital Shift!', 20, 360);
    context.fillStyle = 'black';
    context.font = '28px sans-serif';
    context.fillText('During your 10hours shift,', 240, 440);
    context.fillText('you need to reach at least 25 patients,', 170, 470);
    context.fillText('to save the day!', 310, 500);
    context.font = '40px sans-serif';
    context.fillText('Move the doctor with the arrow keys,', 80, 580);
    context.fillStyle = 'red';
    context.font = '70px sans-serif';
    context.fillText('Your shift starts now!', 80, 680);

    context.restore();
  }

  restart() {
    this.player = new Character(this, 18, 18);
    this.maze = new Maze(this);
    this.timer = new Timer(this);
    this.gameStarted = true;
    this.gameStartingTime = 0;
    this.score = new Score(this);
    this.patientsArray = [];
    this.generatePatients();
    this.createPatientTimer = 0;
    this.createPatientInterval = 7000;
    this.score.score = 0;
    this.clean();
    this.drawEverything();
    this.running = true;
    this.loop();
  }

  runLogic(timestamp) {
    this.player.borderCollision();

    // everytime the doctor saves 3 patients, another 3 will be generated and every 7seconds passed will generate 3 more.

    for (let patient of this.patientsArray) {
      patient.patientsCollision();
      if (
        this.patientsArray.length === 0 ||
        this.createPatientTimer < timestamp - this.createPatientInterval
      ) {
        this.createPatientTimer = timestamp;
        this.generatePatients();
        coughSound.play();
      }
    }

    //  If this conditions are met you either lose or win the game.
    // If time reaches 10hours shift and the patients saved are less than 22 than you lose, else you win.

    if (
      this.score.score >= 25 &&
      Math.floor((timestamp - this.gameStartingTime) / 1000 / 6) === 10
    ) {
      this.win();
      winningMusic.play();
    } else if (
      this.score.score < 25 &&
      Math.floor((timestamp - this.gameStartingTime) / 1000 / 6) === 10
    ) {
      this.lose();
      losingMusic.play().volume(0, 5);
    }
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawEverything(timestamp) {
    this.maze.paint();
    this.player.drawPlayer();
    this.timer.paint(timestamp - this.gameStartingTime);
    this.score.paint();

    for (let patient of this.patientsArray) {
      patient.drawPatients();
    }
  }

  generatePatients() {
    for (let i = 0; i < 3; i++) {
      const patient = new Patients(this, 3, 3);
      this.patientsArray.push(patient);
    }
  }

  // movement of the player with arrow keys

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

  // methods for winning
  win() {
    this.paintWin();
    this.running = false;
    winningMusic.play();
    coughSound.pause();
    drycoughSound.pause();
    backMusic.pause();
  }

  paintWin() {
    this.clean();

    const context = this.context;

    context.fillStyle = '#B8EDF6';

    context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    context.save();

    context.fillStyle = '#004d70';

    context.font = '80px sans-serif';
    context.fillText('You saved the day!', 70, 200);

    const workers = new Image();
    workers.src = 'images/workers.jpg';
    workers.addEventListener('load', () => {
      context.drawImage(workers, 50, 300, 700, 500);
    });
    context.fillStyle = '#004d70';

    context.restore();
  }

  //methods for losing
  lose() {
    this.paintLose();
    this.running = false;
    losingMusic.play();
    coughSound.pause();
    drycoughSound.pause();
    backMusic.pause();
  }

  paintLose() {
    this.clean();

    const context = this.context;

    context.save();

    context.fillStyle = '#004d70';

    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    context.fillStyle = 'red';
    context.font = '140px sans-serif';

    context.fillText('Game Over!', 20, 130);

    context.fillStyle = 'black';
    context.font = '34px sans-serif';
    context.fillText('You saved a few patients,', 200, 200);
    context.fillText('but you couldn´t save them all!', 160, 240);
    context.fillStyle = 'white';
    context.font = '28px sans-serif';
    context.fillText('If this made you feel frustrated,', 200, 300);
    context.font = '28px sans-serif';
    context.fillText(
      'imagine the reality for healthcare professionals!',
      90,
      330
    );
    context.font = '44px sans-serif';
    context.fillText('Respect our front-line pros,', 140, 400);
    context.font = '48px sans-serif';
    context.fillText('respect the rules!', 220, 460);

    const rules = new Image();
    rules.src = 'images/rules.jpg';
    rules.addEventListener('load', () => {
      context.drawImage(rules, 125, 480, 540, 330);
    });

    context.restore();
  }

  loop(timestamp) {
    if (this.gameStarted && timestamp) {
      this.gameStartingTime = timestamp;
      this.gameStarted = false;
    }
    // Run logic
    this.runLogic(timestamp);

    if (this.running === true) {
      backMusic.play();
      this.clean();
      this.drawEverything(timestamp);
      window.requestAnimationFrame(timestamp => this.loop(timestamp));
    }
  }
}
