const Paddle = require('./Paddle.js');

function Board() {
  this.width = 300;
  this.height = 300;
  this.paddle = new Paddle({x: 125, height: 10, width: 50});
}

module.exports = Board;
