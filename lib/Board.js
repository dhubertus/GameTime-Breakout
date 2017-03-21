const Paddle = require('./Paddle.js');
const Block = require('./Block.js');
const Ball = require('./Ball.js')
// import Paddle from './Paddle'
// const context = canvas.getContext('2d')
let start = null;


// function Board() {
//   this.width = 500
//   this.height = 500;
//   this.paddle = new Paddle({x: 225, height: 10, width: 50});
//   this.block = createBlocks()
//   this.block2 = level2()
//   this.block3 = winGame()
//   this.level = 1
//   this.score = 0
//   this.lives = 5
//   this.ball = new Ball({x: 240, y: 440, width: 10, height: 10, color: '#bc3654'})
// }


class Board {
  constructor({ ctx }) {
    this.width = 500
    this.height = 500
    this.paddle = new Paddle({x: 225, height: 10, width: 50})
    this.block = createBlocks()
    this.block2 = level2()
    this.block3 = winGame()
    this.level = 1
    this.score = 0
    this.lives = 5
    this.ball = new Ball({x: 240, y: 440, width: 10, height: 10, color: '#bc3654'})
    this.context = ctx
    this.blockDestroySound = new Audio("../sounds/Explosion6.wav");
    this.paddleHitSound = new Audio("../sounds/sfx_sounds_impact13.wav");
    this.gameOverSound = new Audio("../sounds/Explosion5.wav");
    this.gameplaySound = new Audio("../sounds/Visager_-_04_-_Factory_Time.mp3");
  }

  drawBrickLoop() {
    if (this.score >= 120) {
      for (let j = 0; j < this.block3.length; j++){
        console.log(this.block3)
        this.block3[j].draw(this.context);
        this.ball.x = 240
        this.ball.y = 250
        this.ball.vx = 0
        this.ball.vy = 0
      }
    } else if (this.score >= 60){
      for (let h = 0; h < this.block2.length; h++){
        this.block2[h].draw(this.context);
      }
    } else {
      for (let i = 0; i < this.block.length; i++){
        this.block[i].draw(this.context);
      }
    }
  }

  levelTwoBallRestart() {
    if (this.level == 2 && this.ball.vx == 4 && this.ball.vy == -4 && this.ball.x >= 240) {
      this.ball.vx = 6
      this.ball.vy = -6
    }
  }

  lifeCounter() {
    this.lives --
    let lives = document.getElementById('lives')
    lives.innerText = this.lives
  }

  changeScoreAndLevel() {
    this.score ++
    let scoreHtml = document.getElementById('score')
    scoreHtml.innerText = this.score
    let levelHtml = document.getElementById('level');
    if (this.score == 60) {
      this.level ++
      levelHtml.innerText = this.level
      this.ball.x = 240
      this.ball.y = 440
      this.ball.vy = -4
    }
  }

  paddleCollision() {
    if (this.ball.x < this.paddle.x + this.paddle.width &&
      this.ball.x + this.ball.width > this.paddle.x &&
      this.ball.y < this.paddle.y + this.paddle.height &&
      this.ball.height + this.ball.y > this.paddle.y
    ) {
      this.ball.vy = -this.ball.vy
      this.paddleHitSound.play()
    }
  }

  blockCollision() {
    for (let i = 0; i < this.block.length; i++) {
      if (this.ball.x + this.ball.width >= this.block[i].x
        && this.ball.x + this.ball.width <= this.block[i].x + this.block[i].width
        && this.ball.y + this.ball.height >= this.block[i].y
        && this.ball.y + this.ball.height <= this.block[i].y + this.block[i].height) {
        this.ball.vy = -this.ball.vy
        console.log('hit', this.block[i])
        this.block.splice(i, 1)
        console.log(this.block.length)
        this.changeScoreAndLevel()
        this.blockDestroySound.play();
      }
    }
  }

  blockCollisionLevel2() {
    for (let g = 0; g < this.block2.length; g++) {
      if (this.ball.x < this.block2[g].x + this.block2[g].width &&
        this.ball.x + this.ball.width > this.block2[g].x &&
        this.ball.y < this.block2[g].y + this.block2[g].height &&
        this.ball.height + this.ball.y > this.block2[g].y) {
        console.log('hit on a block 2')
        this.block2.splice(g, 1)
        console.log(this.block2.length);
        this.ball.vy = -this.ball.vy
        this.changeScoreAndLevel()
        this.blockDestroySound.play();
      }
    }
  }

  restartBall(timer) {
    if (this.ball.vx === 0 && this.ball.vy === 0 && !start) {
      start = timer
    }
      let delay = timer - start;
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
        let result = confirm('Game Over. Want to Play Again?')
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

  gameDraw(timer) {

    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.paddle.move({x: 0, y: 0}).draw(this.context);
    this.ball.draw(this.context)
    this.paddleCollision()
    this.blockCollision()
    if (this.level == 2) {
      this.blockCollisionLevel2()
    }
    this.levelTwoBallRestart()
    this.restartBall(timer, this.context)
    this.drawBrickLoop()
  }
}




// Board.prototype.levelTwoBallRestart = function () {
//   if (this.level == 2 && this.ball.vx == 4 && this.ball.vy == -4 && this.ball.x >= 240) {
//     this.ball.vx = 6
//     this.ball.vy = -6
//   }
// };


// Board.prototype.drawBrickLoop = function () {
//   if (this.score >= 120) {
//     for (let j = 0; j < this.block3.length; j++){
//       console.log(this.block3)
//       this.block3[j].draw(context);
//       this.ball.x = 240
//       this.ball.y = 250
//       this.ball.vx = 0
//       this.ball.vy = 0
//     }
//   } else if (this.score >= 60){
//     for (let h = 0; h < this.block2.length; h++){
//       this.block2[h].draw(context);
//     }
//   } else {
//     for (let i = 0; i < this.block.length; i++){
//       this.block[i].draw(context);
//     }
//   }
// }


function level2() {
  let blockArray2 = []
  let d = 1;
  let e = -1
  for(let j = 0; j < 60; j++) {
    let x = (j % 10) * 50
    if (j % 10 === 0){
      d++
      e++
    }
    let y = d * 25
    let blockColors = ['white', 'green', 'red', 'orange', 'yellow', 'purple']
    blockArray2.push(new Block({x: x, y: y, width: 50, height: 25, color: blockColors[e]}))
  }
  return blockArray2
};


// Board.prototype.lifeCounter = function () {
//   this.lives --
//   let lives = document.getElementById('lives')
//   lives.innerText = this.lives
// };


// Board.prototype.changeScoreAndLevel = function() {
//   this.score ++
//   let scoreHtml = document.getElementById('score')
//   scoreHtml.innerText = this.score
//   let levelHtml = document.getElementById('level');
//   if (this.score == 60) {
//     this.level ++
//     levelHtml.innerText = this.level
//     this.ball.x = 240
//     this.ball.y = 440
//     this.ball.vy = -4
//   }
// }


function createBlocks() {
  let blockArray = []
  let z = 1;
  let c = -1
  for(let i = 0; i < 60; i++) {
    let x = (i % 10) * 50
    if (i % 10 === 0){
      z++
      c++
    }
    let y = z * 25
    let blockColors = ['#bc3654', '#bc2e24', '#bc4b24', '#bcae24', '#24be24', '#2436bc']
    blockArray.push(new Block({x: x, y: y, width: 50, height: 25, color: blockColors[c]}))

  }
  return blockArray
}


// Board.prototype.paddleCollision = function () {
//   if (this.ball.x < this.paddle.x + this.paddle.width &&
//     this.ball.x + this.ball.width > this.paddle.x &&
//     this.ball.y < this.paddle.y + this.paddle.height &&
//     this.ball.height + this.ball.y > this.paddle.y
//   ) {
//     this.ball.vy = -this.ball.vy
//   }
//   // NOTE This is here until we know which hit detection method we want to use
//   // if (this.ball.x + this.ball.width >= this.paddle.x
//   //   && this.ball.x - this.ball.width <= this.paddle.x + this.paddle.width
//   //   && this.ball.y + this.ball.height >= this.paddle.y
//   //   && this.ball.y + this.ball.height <= this.paddle.y + this.paddle.height) {
//   //   this.ball.vy = -this.ball.vy
//   //   paddleHitSound.play()
//   //   console.log(this.ball.vy)
//   //   //this.ball.vx = -this.ball.vx totally works. We just need to determine what half of the paddle it would fire on
//   //   // this.ball.vx = -this.ball.vx
//   // }
// };

// Board.prototype.blockCollision = function (count) {
//   // for (let i = 0; i < this.block.length; i++) {
//   //   if (this.ball.x + this.ball.width >= this.block[i].x
//   //     && this.ball.x + this.ball.width <= this.block[i].x + this.block[i].width
//   //     && this.ball.y + this.ball.height >= this.block[i].y
//   //     && this.ball.y + this.ball.height <= this.block[i].y + this.block[i].height) {
//   //     this.ball.vy = -this.ball.vy
//   //     console.log('hit', this.block[i])
//   //     this.block.splice(i, 1)
//   //     // blockDestroySound.play();
//   //     console.log(this.block.length)
//   //     this.changeScoreAndLevel()
//   //   }
//   // }
// }

// Board.prototype.blockCollisionLevel2 = function () {
//   for (let g = 0; g < this.block2.length; g++) {
//     if (this.ball.x < this.block2[g].x + this.block2[g].width &&
//       this.ball.x + this.ball.width > this.block2[g].x &&
//       this.ball.y < this.block2[g].y + this.block2[g].height &&
//       this.ball.height + this.ball.y > this.block2[g].y) {
//       console.log('hit on a block 2')
//       this.block2.splice(g, 1)
//       console.log(this.block2.length);
//       this.ball.vy = -this.ball.vy
//       this.changeScoreAndLevel()
//       // blockDestroySound.play();
//     }
//   }
// }


// let start = null;
// Board.prototype.restartBall = function (timer) {
//   if (this.ball.vx === 0 && this.ball.vy === 0 && !start) {
//     start = timer
//   }
//     let delay = timer - start;
//   if (this.ball.vx === 0 && this.ball.vy === 0 && delay > 1500) {
//     this.ball.x = 240
//     this.ball.y = 440
//   }
//   if (this.ball.vx === 0 && this.ball.vy === 0 && this.ball.x == 240) {
//     if (this.lives == 0) {
//       this.ball.vx = 0
//       this.ball.vy = 0
//       this.ball.x = 240
//       this.ball.y = 520
//       let result = confirm('Game Over. Want to Play Again?')
//       this.lives = 101
//       if (result == true) {
//         window.location.reload(true)
//       }
//     } else {
//       this.ball.vx = 4;
//       console.log(this.ball.vx)
//       this.ball.vy = -4;
//       start = null
//       this.lifeCounter()
//     }
//   }
// }


function winGame () {
  let winArray = [1,0,0,0,1,2,1,0,0,1,
                  1,0,0,0,1,2,1,0,0,1,
                  1,0,1,0,1,2,1,1,0,1,
                  1,0,1,0,1,2,1,1,0,1,
                  1,0,1,0,1,2,1,1,1,1,
                  1,0,1,0,1,2,1,0,1,1,
                  1,1,1,1,1,2,1,0,1,1,
                  1,1,0,1,1,2,1,0,0,1,
                  1,0,0,0,1,2,1,0,0,1]
  let w = 1;
  for(let i = 0; i < 90; i++) {
    let x = (i % 10) * 50
    if (i % 10 === 0){
      w++
    }
    let y = w * 25
    if (winArray[i] == 0) {
      winArray.splice(i, 1, new Block({x: x, y: y, width: 50, height: 25, color: '#040204'}))
    } else if (winArray[i] == 1) {
      winArray.splice(i, 1, new Block({x: x, y: y, width: 50, height: 25, color: '#bc3654'}))
    } else if (winArray[i] == 2) {
      winArray.splice(i, 1, new Block({x: x, y: y, width: 50, height: 25, color: '#bc4b24'}))
    }
  }
  return winArray
}


// let blockDestroySound = new Audio("../sounds/Explosion6.wav");
// let paddleHitSound = new Audio("../sounds/sfx_sounds_impact13.wav");
// let gameOverSound = new Audio("../sounds/Explosion5.wav");
// let gameplaySound = new Audio("../sounds/Visager_-_04_-_Factory_Time.mp3");
// gameplaySound.play();
//
//
// let mute = document.getElementById('mute')
// console.log(mute)
// mute.addEventListener('click', function () {
//
//   gameplaySound.paused ? gameplaySound.play() : gameplaySound.pause();
//   paddleHitSound.paused
// })





module.exports = Board;
