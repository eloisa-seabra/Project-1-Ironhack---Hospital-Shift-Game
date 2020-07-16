class Maze {
  constructor(game) {
    this.game = game;
    this.layout = layout;
  }

  runLogic() {}

  paint() {
    const ctx = this.game.context;
    ctx.fillStyle = '#70DBDB';
    for (let i = 0; i < this.layout.length; i++) {
      for (let j = 0; j < this.layout[i].length; j++) {
        if (this.layout[i][j])
          //context.fillRect(x,y,width,height)
          ctx.fillRect(
            j * SQUARE_SIZE,
            i * SQUARE_SIZE,
            SQUARE_SIZE,
            SQUARE_SIZE
          );
      }
    }
  }
}
