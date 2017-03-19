const Paddle = require('./Paddle.js');
const Block = require('./Block.js');
const Ball = require('./Ball.js')
const canvas = document.getElementById('canvas');


function Board() {
  this.width = 500;
  this.height = 500;
  this.paddle = new Paddle({x: 225, height: 10, width: 50});
  this.block = createBlocks()
  this.block2 = level2()
  this.block3 = winGame()
  this.level = 1
  this.score = 0
  this.lives = 5
  // this.block = new Block ({x: 0, y: 0, width: 500, height: 50, color: 'lime'});
  this.ball = new Ball({x: 240, y: 440, width: 10, height: 10, color: '#bc3654'})
  // wtf is this.paddle.x + 20 ???????

}


function level2() {
  var blockArray2 = []
  var d = 1;
  var e = -1
  for(let j = 0; j < 60; j++) {
    var x = (j % 10) * 50
    if (j % 10 === 0){
      d++
      e++
    }
    var y = d * 25
    var blockColors = ['white', 'green', 'red', 'orange', 'yellow', 'purple']
    blockArray2.push(new Block({x: x, y: y, width: 50, height: 25, color: blockColors[e]}))
  }
  return blockArray2
};





Board.prototype.lifeCounter = function () {
  this.lives --
  var lives = document.getElementById('lives')
  lives.innerText = this.lives
};



Board.prototype.changeScoreAndLevel = function() {
  this.score ++
  var scoreHtml = document.getElementById('score')
  scoreHtml.innerText = this.score
  var levelHtml = document.getElementById('level');
  if (this.score == 60) {
    this.level ++
    levelHtml.innerText = this.level
    this.ball.x = 240
    this.ball.y = 440
    this.ball.vy = -4
    // this.ball.vx = 4
    // this.ball.vy = -4
  }
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

  // var board = new Board()

  if (this.y + this.height < 0) {
    this.vy = -this.vy
  }

  if(this.y + this.height > 500 && this.y + this.height < 510 ) {
    // if (board.lives == 0) {
    //   var gameOver = document.getElementById('lives')
    //   gameOver.innerText = 'Game Over'
    //   // gameOverSound.play();
    // } else {
    //   board.lifeCounter()
    // }
    this.y = this.y - 1
    this.vy = 0
    this.vx = 0
    gameOverSound.play()
    // Need to make the console log remove a life instead
  }

  if (this.x + this.width < 10 || this.x + this.width > 500) {
    this.vx = -this.vx
  }
  return this;
}

Board.prototype.paddleCollision = function () {
  // if (this.ball.x + this.ball.width >= this.paddle.x
  //   && this.ball.x - this.ball.width <= this.paddle.x + this.paddle.width
  //   && this.ball.y + this.ball.height >= this.paddle.y
  //   && this.ball.y + this.ball.height <= this.paddle.y + this.paddle.height) {
  //   this.ball.vy = -this.ball.vy
  //   paddleHitSound.play()
  //   console.log(this.ball.vy)
  //   //this.ball.vx = -this.ball.vx totally works. We just need to determine what half of the paddle it would fire on
  //   // this.ball.vx = -this.ball.vx
  // }
  if (this.ball.x < this.paddle.x + this.paddle.width &&
    this.ball.x + this.ball.width > this.paddle.x &&
    this.ball.y < this.paddle.y + this.paddle.height &&
    this.ball.height + this.ball.y > this.paddle.y
  ) {
    this.ball.vy = -this.ball.vy
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
      this.changeScoreAndLevel()
      // this.block[i].x = 0;
      // this.block[i].y = 0;
      // this.block[i].width = 0;
      // this.block[i].height = 0;
    }
  }
}

Board.prototype.blockCollisionLevel2 = function () {
  for (var g = 0; g < this.block2.length; g++) {
    if (this.ball.x < this.block2[g].x + this.block2[g].width &&
      this.ball.x + this.ball.width > this.block2[g].x &&
      this.ball.y < this.block2[g].y + this.block2[g].height &&
      this.ball.height + this.ball.y > this.block2[g].y) {
      console.log('hit on a block 2')
      this.block2.splice(g, 1)
      console.log(this.block2.length);
      this.ball.vy = -this.ball.vy
      this.changeScoreAndLevel()
      blockDestroySound.play();
    }
  }
}

var blockDestroySound = new Audio("../sounds/Explosion6.wav"); // buffers automatically when created
var paddleHitSound = new Audio("../sounds/sfx_sounds_impact13.wav"); // buffers automatically when created
var gameOverSound = new Audio("../sounds/Explosion5.wav"); // buffers automatically when created
var gameplaySound = new Audio("../sounds/Visager_-_04_-_Factory_Time.mp3");
// gameplaySound.play();

var start = null;
Board.prototype.restartBall = function (timer) {
  if (this.ball.vx === 0 && this.ball.vy === 0 && !start) {
    start = timer
  }
    var delay = timer - start;
  if (this.ball.vx === 0 && this.ball.vy === 0 && delay > 1500) {
    this.ball.x = 240
    this.ball.y = 440
  }
  if (this.ball.vx === 0 && this.ball.vy === 0 && this.ball.x == 240) {
    if (this.lives == 0) {
      this.ball.vx = 0
      this.ball.vy = 0
      this.ball.x = 240
      this.ball.y = 520
      var result = confirm('Game Over. Want to Play Again?')
      this.lives = 101
      if (result == true) {
        window.location.reload(true)
      }
    } else {
      this.ball.vx = 4;
      console.log(this.ball.vx)
      this.ball.vy = -4;
      start = null
      this.lifeCounter()
    }
  }
}

function winGame () {

    var winArray = [1,0,0,0,1,2,1,0,0,1,
                    1,0,0,0,1,2,1,0,0,1,
                    1,0,1,0,1,2,1,1,0,1,
                    1,0,1,0,1,2,1,1,0,1,
                    1,0,1,0,1,2,1,1,1,1,
                    1,0,1,0,1,2,1,0,1,1,
                    1,1,1,1,1,2,1,0,1,1,
                    1,1,0,1,1,2,1,0,0,1,
                    1,0,0,0,1,2,1,0,0,1]

    var w = 1;
    for(let i = 0; i < 90; i++) {
      var x = (i % 10) * 50
      if (i % 10 === 0){
        w++
      }
      var y = w * 25

      if (winArray[i] == 0) {
      winArray.splice(i, 1, new Block({x: x, y: y, width: 50, height: 25, color: '#040204'}))
      // winArray.push(new Block({x: x, y: y, width: 50, height: 25, color: 'blue'}))
      // winArray.shift()
    } else if (winArray[i] == 1) {
      winArray.splice(i, 1, new Block({x: x, y: y, width: 50, height: 25, color: '#bc3654'}))
      // winArray.push(new Block({x: x, y: y, width: 50, height: 25, color: 'red'}))
      // winArray.shift()
    } else if (winArray[i] == 2) {
      winArray.splice(i, 1, new Block({x: x, y: y, width: 50, height: 25, color: '#bc4b24'}))
      // winArray.push(new Block({x: x, y: y, width: 50, height: 25, color: 'green'}))
      // winArray.shift()
    }

    }

    return winArray



}



// var element = document.getElementById('SomeElementYouWantToAnimate');
// element.style.position = 'absolute';
//
// function step(timestamp) {
//   if (!start) start = timestamp;
//   var progress = timestamp - start;
//   element.style.left = Math.min(progress / 10, 200) + 'px';
//   if (progress < 2000) {
//     window.requestAnimationFrame(step);
//   }
// }
//
// window.requestAnimationFrame(step);



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
