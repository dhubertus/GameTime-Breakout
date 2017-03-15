const Paddle = require('./Paddle.js');
const Block = require('./Block.js');

function Board() {
  this.width = 300;
  this.height = 300;
  this.paddle = new Paddle({x: 125, height: 10, width: 50});
  this.block = new Block ({x: 0, y: 0, width: 300, height: 50, color: 'lime'});
}

module.exports = Board;
