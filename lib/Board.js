const Paddle = require('./Paddle.js');
const Block = require('./Block.js');
const Ball = require('./Ball.js')
const Levels = require('./Levels.js')
// import Paddle from './Paddle'
let start = null;


class Board {
  constructor({ ctx }) {
    this.width   = 500
    this.height  = 500
    this.paddle  = new Paddle({x: 225, height: 10, width: 50})
    this.block   = new Levels().level1()
    this.block2  = new Levels().level2()
    this.block3  = new Levels().winGame()
    this.level   = 1
    this.score   = 0
    this.lives   = 5
    this.ball    = new Ball({x: 240, y: 440, width: 10, height: 10, color: '#bc3654'})
    this.context = ctx

    this.blockDestroySound = new Audio("../sounds/Explosion6.wav");
    this.paddleHitSound    = new Audio("../sounds/sfx_sounds_impact13.wav");
    this.gameOverSound     = new Audio("../sounds/Explosion5.wav");
    this.gameplaySound     = new Audio("../sounds/Visager_-_04_-_Factory_Time.mp3");
  }


  drawBrickLoop() {
    if (this.score >= 120) {
      for (let j = 0; j < this.block3.length; j++) {
        this.block3[j].draw(this.context);
        this.ball.x  = 240
        this.ball.y  = 250
        this.ball.vx = 0
        this.ball.vy = 0
      }
    } else if (this.score >= 60) {
      for (let h = 0; h < this.block2.length; h++) {
        this.block2[h].draw(this.context);
      }
    } else {
      for (let i = 0; i < this.block.length; i++) {
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
    let lives = document.getElementById('lives')

    this.lives --
    lives.innerText = this.lives
  }


  changeScoreAndLevel() {
    let scoreHtml = document.getElementById('score')
    let levelHtml = document.getElementById('level');

    this.score ++
    scoreHtml.innerText = this.score

    if (this.score == 60) {
      this.level ++
      levelHtml.innerText = this.level
      this.ball.x  = 240
      this.ball.y  = 440
      this.ball.vy = -4
    }
  }


  paddleCollisionTopLeft() {
    if (this.ball.x <= this.paddle.x + 10 &&
    this.ball.x + this.ball.width >= this.paddle.x &&
    this.ball.y < this.paddle.y + this.paddle.height &&
    this.ball.height + this.ball.y > this.paddle.y
  ) {
      this.ball.vy = -this.ball.vy
      if (this.ball.vx > 0) {
        this.ball.vx = -this.ball.vx
      }
      this.paddleHitSound.play()
    }
  }


  paddleCollisionTopCenter() {
    if (this.ball.x <= (this.paddle.x + 10) + (this.paddle.width - 20) &&
      this.ball.x > this.paddle.x + 10 &&
      this.ball.y < this.paddle.y + this.paddle.height &&
      this.ball.height + this.ball.y > this.paddle.y
    ) {
      this.ball.vy = -this.ball.vy
      this.paddleHitSound.play()
    }
  }


  paddleCollisionTopRight() {
    if (this.ball.x < (this.paddle.x + 40) + (this.paddle.width - 40) &&
      this.ball.x > this.paddle.x + 40 &&
      this.ball.y < this.paddle.y + this.paddle.height &&
      this.ball.height + this.ball.y > this.paddle.y
    ) {
      this.ball.vy = -this.ball.vy

      if (this.ball.vx < 0) {

        this.ball.vx = -this.ball.vx
      }
      this.paddleHitSound.play()
    }
  }

  blockBottomCollision() {
    for (let i = 0; i < this.block.length; i++) {
      if (
        this.ball.x <= this.block[i].x + this.block[i].width &&
        this.ball.x + this.ball.width >= this.block[i].x &&
        this.ball.y + this.ball.height >= this.block[i].y &&
        this.ball.y <= this.block[i].y)
        {
          console.log(this.block[i].x, this.block[i].y, "Hit bottom")
        this.block.splice(i, 1)
        this.ball.vy = -this.ball.vy
        // this.ball.vx = -this.ball.vx

        this.changeScoreAndLevel()
      }
    }
  }

  blockTopCollision() {
    for (let i = 0; i < this.block.length; i++) {
      if (
        this.ball.x <= this.block[i].x + this.block[i].width &&
        this.ball.x + this.ball.width >= this.block[i].x &&
        this.ball.y + this.ball.height >= this.block[i].y &&
        this.ball.y <= this.block[i].y)
        {
          console.log(this.block[i].x, this.block[i].y, "Hit top")
        this.block.splice(i, 1)
        this.ball.vy = -this.ball.vy
        // this.ball.vx = -this.ball.vx

        this.changeScoreAndLevel()
      }
    }
  }

  blockRightCollision() {
    for (let i = 0; i < this.block.length; i++) {
      if (
        this.ball.y <= this.block[i].y + this.block[i].width &&
        this.ball.y + this.ball.width >= this.block[i].y &&
        this.ball.x <= this.block[i].x + this.block[i].width &&
        this.ball.x + this.ball.width >= this.block[i].x + this.block[i].width) {
          console.log(this.block[i].y,this.block[i].x, "Hit right side")
          this.block.splice(i, 1)
          // this.ball.vy = -this.ball.vy

          this.ball.vx = -this.ball.vx
          this.changeScoreAndLevel()
        }
    }
  }

  blockLeftCollision() {
    for (let i = 0; i < this.block.length; i++) {
      if (
        this.ball.y >= this.block[i].y &&
        this.ball.y + this.ball.height <= this.block[i].y + this.block[i].height &&
        this.ball.x + this.ball.width >= this.block[i].x &&
        this.ball.x <= this.block[i].x + 10) {
          console.log(this.block[i].y,this.block[i].x, "Hit left side")
          this.block.splice(i, 1)
          // this.ball.vy = -this.ball.vy

          this.ball.vx = -this.ball.vx
          this.changeScoreAndLevel()
        }
    }
  }


  blockCollision() {
    for (let i = 0; i < this.block.length; i++) {
      if (this.ball.x + this.ball.width >= this.block[i].x
        && this.ball.x - this.ball.width <= this.block[i].x + this.block[i].width
        && this.ball.y + this.ball.height >= this.block[i].y
        && this.ball.y + this.ball.height <= this.block[i].y + this.block[i].height) {
        this.ball.vy = -this.ball.vy
        this.block.splice(i, 1)
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
        this.block2.splice(g, 1)
        this.ball.vy = -this.ball.vy
        this.changeScoreAndLevel()
        this.blockDestroySound.play();
      }
    }
  }

  restartBall(timer) {
    if (this.ball.vx === 0 && this.ball.vy === 0 && this.ball.y == 490 && !start) {
      start = timer
    }


    let delay = timer - start;

    if (this.ball.vx === 0 && this.ball.vy === 0 && this.ball.y == 490 && delay > 1500) {
      this.ball.x = 240
      this.ball.y = 440
      start = null
      this.lifeCounter()
    }

    if (this.ball.vx === 0 && this.ball.vy === 0 && this.ball.y == 490 && 0 < this.lives < 5) {
      if (this.lives == 0) {
        let result = confirm('Game Over. Want to Play Again?')

        this.ball.vx = 0
        this.ball.vy = 0
        this.ball.x = 240
        this.ball.y = 520
        this.lives = 101
        if (result == true) {
          window.location.reload(true)
        }
      }
    }
  }


  gameDraw(timer) {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.paddle.move({x: 0, y: 0}).draw(this.context);
    this.ball.draw(this.context)
    this.paddleCollisionTopCenter()
    this.paddleCollisionTopLeft()
    this.paddleCollisionTopRight()
    this.blockCollision()
    // this.blockTopCollision()
    // this.blockLeftCollision()
    // this.blockRightCollision()
    if (this.level == 2) {
      this.blockCollisionLevel2()
    }
    this.levelTwoBallRestart()
    this.restartBall(timer, this.context)
    this.drawBrickLoop()
  }
}


module.exports = Board;
