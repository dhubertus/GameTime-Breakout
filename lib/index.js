const Board = require('./Board.js');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let board = new Board({ctx: ctx})
// let start = null;


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


// function drawBrickLoop() {
//   if (board.score >= 120) {
//
//     for (let j = 0; j < board.block3.length; j++){
//       console.log(board.block3)
//       board.block3[j].draw(context);
//       board.ball.x = 240
//       board.ball.y = 250
//       board.ball.vx = 0
//       board.ball.vy = 0
//     }
//   } else if (board.score >= 60){
//     for (let h = 0; h < board.block2.length; h++){
//       board.block2[h].draw(context);
//     }
//   } else {
//     for (let i = 0; i < board.block.length; i++){
//       board.block[i].draw(context);
//     }
//   }
// }


// function levelTwoBallRestart() {
//   if (board.level == 2 && board.ball.vx == 4 && board.ball.vy == -4 && board.ball.x >= 240) {
//     board.ball.vx = 6
//     board.ball.vy = -6
//   }
// }


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
  console.log(event.key)
  if (event.key == 'ArrowRight') {
    board.paddle.x += 40
  } else if (event.key == 'ArrowLeft') {
    board.paddle.x -= 40
  }
  // if (event == 'ArrayRight')
})

// let blockDestroySound = new Audio("../sounds/Explosion6.wav");
// let paddleHitSound = new Audio("../sounds/sfx_sounds_impact13.wav");
// let gameOverSound = new Audio("../sounds/Explosion5.wav");
// let gameplaySound = new Audio("../sounds/Visager_-_04_-_Factory_Time.mp3");
board.gameplaySound.play();


let mute = document.getElementById('mute')
console.log(mute)
mute.addEventListener('click', function () {

  board.gameplaySound.paused ? board.gameplaySound.play() : board.gameplaySound.pause();
})
