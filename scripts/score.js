class Score {
  constructor(game) {
    this.game = game;
    this.score = 0;
  }

  paint() {
    const context = this.game.context;
    //this.game.arrayScore.length;

    context.save();
    context.fillStyle = 'black';
    context.font = '18px sans-serif';

    context.fillText('Saved: ' + this.score + '  patients', 455, 17);

    context.restore();
  }
}
