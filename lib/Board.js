const Paddle = require('./Paddle.js');
const Block = require('./Block.js');
const Ball = require('./Ball.js')

function Board() {
  this.width = 300;
  this.height = 300;
  this.paddle = new Paddle({x: 125, height: 10, width: 50});
  this.block = new Block ({x: 0, y: 0, width: 300, height: 50, color: 'lime'});
  this.ball = new Ball({x: this.paddle.x + 20, y: 265, width: 10, height: 10, color: 'red'})
}

module.exports = Board;
