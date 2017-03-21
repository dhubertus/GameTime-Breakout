const Board = require('./Board.js');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let board = new Board({ctx})
let mute = document.getElementById('mute')


requestAnimationFrame(function gameloop (timer) {
  // context.clearRect(0, 0, canvas.width, canvas.height);
  board.gameDraw(timer)
  // board.paddle.move({x: 0, y: 0}).draw(context);
  // board.ball.draw(context)
  // board.paddleCollision()
  // board.blockCollision()
  // if (board.level == 2) {
  //   board.blockCollisionLevel2()
  // }
  // board.levelTwoBallRestart()
  // board.restartBall(timer, context)
  // board.drawBrickLoop()
  requestAnimationFrame(gameloop);
})


canvas.addEventListener('mousemove', function(e) {
  let mouseLocation = e.offsetX;

  if (mouseLocation >= 475) {
    this.x = 450
  } else if (mouseLocation <= 25) {
    this.x = 0
  } else {
    this.x = (mouseLocation - 25)
  }
}.bind(board.paddle))


window.addEventListener('keydown', function(event) {
  if (event.key == 'ArrowRight') {
    board.paddle.x += 40
  } else if (event.key == 'ArrowLeft') {
    board.paddle.x -= 40
  }
})


mute.addEventListener('click', function () {
  board.gameplaySound.paused ? board.gameplaySound.play() : board.gameplaySound.pause();
})
