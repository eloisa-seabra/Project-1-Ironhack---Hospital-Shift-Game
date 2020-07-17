class Timer {
  constructor(game) {
    this.game = game;
  }

  paint(timestamp) {
    const context = this.game.context;
    context.save();
    context.fillStyle = 'black';
    context.font = '20px sans-serif';

    context.fillText(
      'Shift Hours passed:' + Math.floor(timestamp / 1000 / 6),
      2,
      17
    );

    context.restore();
  }
}
