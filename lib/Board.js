const Paddle = require('./Paddle.js');
const Block = require('./Block.js');
const Ball = require('./Ball.js')

function Board() {
  this.width = 500;
  this.height = 500;
  this.paddle = new Paddle({x: 125, height: 10, width: 50});
  this.block = createBlocks()
  // this.block = new Block ({x: 0, y: 0, width: 500, height: 50, color: 'lime'});
  this.ball = new Ball({x: this.paddle.x + 20, y: 475, width: 10, height: 10, color: 'red'})
}


function createBlocks() {
  var blockArray = []
  var z = -1;
  for(let i = 0; i < 60; i++) {
    var x = (i % 10) * 50
    if (i % 10 === 0){
      z++
    }
    var y = z * 25
    var blockColors = ['#bc3654', '#bc2e24', '#bc4b24', '#bcae24', '#24be24', '#2436bc']
    blockArray.push(new Block({x: x, y: y, width: 50, height: 25, color: blockColors[z]}))

  }
  return blockArray
}



Ball.prototype.collision = function () {
  this.x += this.vx
  this.y += this.vy

  if (this.y + this.vy < 0 || this.y + this.vy > 500) {
    this.vy = -this.vy
  }

  if (this.x + this.vx < 0 || this.x + this.vx > 500) {
    this.vx = -this.vx
  }
  return this;
}

Board.prototype.paddleCollision = function () {
  if (this.ball.x + this.ball.vx >= this.paddle.x
    && this.ball.x + this.ball.vx <= this.paddle.x + 75
    && this.ball.y + this.ball.vy >= this.paddle.y
    && this.ball.y + this.ball.vy <= this.paddle.y + 10) {
    this.ball.vy = -this.ball.vy
    console.log(this.ball.vy)
    // this.ball.vx = -this.ball.vx
  }
};

module.exports = Board;
