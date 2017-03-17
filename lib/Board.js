const Paddle = require('./Paddle.js');
const Block = require('./Block.js');
const Ball = require('./Ball.js')



function Board() {
  this.width = 500;
  this.height = 500;
  this.paddle = new Paddle({x: 125, height: 10, width: 50});
  this.block = createBlocks()
  this.level = 1;

  // this.block = new Block ({x: 0, y: 0, width: 500, height: 50, color: 'lime'});
  this.ball = new Ball({x: this.paddle.x + 20, y: 440, width: 10, height: 10, color: '#bc3654'})
}


function createBlocks() {
  var blockArray = []
  var z = 1;
  var c = -1
  for(let i = 0; i < 60; i++) {
    var x = (i % 10) * 50
    if (i % 10 === 0){
      z++
      c++
    }
    var y = z * 25
    var blockColors = ['#bc3654', '#bc2e24', '#bc4b24', '#bcae24', '#24be24', '#2436bc']
    blockArray.push(new Block({x: x, y: y, width: 50, height: 25, color: blockColors[c]}))

  }
  return blockArray
}



Ball.prototype.collision = function () {
  this.x += this.vx
  this.y += this.vy

  if (this.y + this.height < 0) {
    this.vy = -this.vy
  }

  if(this.y + this.height > 500) {
    console.log('Game Over!')
    this.y = this.y - 1
    this.vy = 0
    this.vx = 0
    gameOverSound.play();
    // Need to make the console log remove a life instead
  }

  if (this.x + this.width < 0 || this.x + this.width > 500) {
    this.vx = -this.vx
  }
  return this;
}

Board.prototype.paddleCollision = function () {
  if (this.ball.x + this.ball.width >= this.paddle.x
    && this.ball.x + this.ball.width <= this.paddle.x + this.paddle.width
    && this.ball.y + this.ball.height >= this.paddle.y
    && this.ball.y + this.ball.height <= this.paddle.y + this.paddle.height) {
    this.ball.vy = -this.ball.vy
    paddleHitSound.play()
    console.log(this.ball.vy)
    //this.ball.vx = -this.ball.vx totally works. We just need to determine what half of the paddle it would fire on
    // this.ball.vx = -this.ball.vx
  }
};

Board.prototype.blockCollision = function (count) {
  // console.log(this.block[0])

  for (var i = 0; i < this.block.length; i++) {
    // console.log(this.block[i].x)
    if (this.ball.x + this.ball.width >= this.block[i].x
      && this.ball.x + this.ball.width <= this.block[i].x + this.block[i].width
      && this.ball.y + this.ball.height >= this.block[i].y
      && this.ball.y + this.ball.height <= this.block[i].y + this.block[i].height) {
      this.ball.vy = -this.ball.vy
      console.log('hit', this.block[i])
      this.block.splice(i, 1)
      blockDestroySound.play();
      console.log(this.block.length)
      // this.block[i].x = 0;
      // this.block[i].y = 0;
      // this.block[i].width = 0;
      // this.block[i].height = 0;
    }
  }
}

var blockDestroySound = new Audio("../sounds/Explosion6.wav"); // buffers automatically when created
var paddleHitSound = new Audio("../sounds/Beep4.wav"); // buffers automatically when created
var gameOverSound = new Audio("../sounds/Explosion5.wav"); // buffers automatically when created
var gameplaySound = new Audio("../sounds/Visager_-_04_-_Factory_Time.mp3");
gameplaySound.play();


// Board.prototype.collisionBlock = function () {
//   //has to meet 5 conditions-- if any of the conditions are true the bodys are not colliding
//   //Therefore if none of them are true  they are colliding
//   var body1 = this.ball
//   var body2 = this.block
//   //return colliding
//   return (body1.y === body2.y ||
//   body1.x + body1.width < body2.x - body2.width ||
//   body1.y + body1.height < body2.y - body2.height ||
//   body1.x - body1.width > body2.x + body2.width ||
//   body1.y - body1.height > body2.y + body2.height
// ) ? console.log('other') : console.log('woring')
// }

// Board.prototype.notColliding = function (body1) {
//   return this.block.filter(function(body2){
//     return collisionBlock(body1, body2)}).length === 0
// }


// Board.prototype.brickCollision = function() {
//   if (this.ball.x + this.ball.width >= this.block.x &&
//     this.ball.x + this.ball.width <= this.block.x + this.block.width
//
//   )
// }

module.exports = Board;
