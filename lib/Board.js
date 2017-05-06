const Paddle = require('./Paddle.js')
const Ball   = require('./Ball.js')
const Levels = require('./Levels.js')
let start = null


class Board {
  constructor({ ctx }) {
    this.width   = 500
    this.height  = 500
    this.paddle  = new Paddle({x: 225, height: 10, width: 50})
    this.block   = new Levels().level1()
    this.level   = 1
    this.score   = 0
    this.lives   = 5
    this.ball    = new Ball({x: 240, y: 440, width: 10, height: 10, color: '#bc3654'})
    this.context = ctx
  }


  drawBrickLoop() {
    if (this.score === 120) {
      for (let j = 0; j < 90; j++) {
        this.block  = new Levels().winGame()
        this.block[j].draw(this.context)
        this.ball.x  = 240
        this.ball.y  = 440
        this.ball.vx = 0
        this.ball.vy = 0
      }
    } else if (this.score == 60) {
      for (let i = 0; i < 60; i++) {
        this.block  = new Levels().level2()
        this.block[i].draw(this.context)
        this.ball.color = '#00BFFF'
      }
    } else if (this.score == 0) {
      for (let i = 0; i < this.block.length; i++) {
        this.block[i].draw(this.context)
      }
    } else {
      for (let i = 0; i < this.block.length; i++) {
        this.block[i].draw(this.context)
      }
    }
  }

  blockCollision() {
    for (let i = 0; i < this.block.length; i++) {
      if (
        this.ball.x + this.ball.width  >= this.block[i].x &&
        this.ball.x - this.ball.width  <= this.block[i].x + this.block[i].width &&
        this.ball.y + this.ball.height >= this.block[i].y &&
        this.ball.y + this.ball.height <= this.block[i].y + this.block[i].height) {
        this.ball.vy = -this.ball.vy
        this.block.splice(i, 1)
        this.changeScoreAndLevel()
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
    let levelHtml = document.getElementById('level')

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
    }
  }


  paddleCollisionTopCenter() {
    if (
      this.ball.x <= (this.paddle.x + 10) + (this.paddle.width - 20) &&
      this.ball.x > this.paddle.x + 10 &&
      this.ball.y < this.paddle.y + this.paddle.height &&
      this.ball.height + this.ball.y > this.paddle.y)
    {
      this.ball.vy = -this.ball.vy
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
    }
  }


  restartBall(timer) {
    if (this.ball.vx === 0 && this.ball.vy === 0 && this.ball.y == 491 && !start) {
      start = timer
    }

    let delay = timer - start

    if (this.ball.vx === 0 && this.ball.vy === 0 && this.ball.y == 489 && delay > 1500) {
      this.ball.x = 240
      this.ball.y = 440
      start = null
      this.lifeCounter()
    }

    if (this.ball.vx === 0 && this.ball.vy === 0 && this.ball.y == 489 && 0 < this.lives < 5) {
      if (this.lives == 0) {
        let result = confirm('Game Over. Want to Play Again?')

        this.ball.vx = 0
        this.ball.vy = 0
        this.ball.x  = 240
        this.ball.y  = 520
        this.lives   = 101
        if (result   == true) {
          window.location.reload(true)
        }
      }
    }
  }


  gameDraw(timer) {
    this.context.clearRect(0, 0, canvas.width, canvas.height)
    this.paddle.draw(this.context)
    this.ball.draw(this.context)
    this.paddleCollisionTopCenter()
    this.paddleCollisionTopLeft()
    this.paddleCollisionTopRight()
    this.drawBrickLoop()
    this.blockCollision()
    this.levelTwoBallRestart()
    this.restartBall(timer, this.context)
  }
}


module.exports = Board
