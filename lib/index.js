const Board = require('./Board.js');

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var board = new Board()
// var paddle = new Paddle({x: 125, height: 10, width: 50});
// board.block.draw(context);
// board.paddle.draw(context);


requestAnimationFrame(function gameloop (timer) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  board.paddle.move({x: 0, y: 0}).draw(context);
  // board.block.draw(context);
  board.ball.draw(context)
  board.paddleCollision()
  board.blockCollision()
  if (board.level == 2) {
    board.blockCollisionLevel2()

  }
  levelTwoBallRestart()
  // board.levelCount()
  board.restartBall(timer, context)


  dumbAssLoop()
  requestAnimationFrame(gameloop);

  // for (var i = 0; i < board.block.length; i++){
  //   board.block[i].draw(context);
  // }
  // board.ball.startRound().draw(context)

  // hitDetection()


  // board.ball.moveWithPaddle({x: 0, y: 0}).draw(context)

})

function dumbAssLoop() {
  if (board.score >= 120) {

    for (var j = 0; j < board.block3.length; j++){
      console.log(board.block3)
      board.block3[j].draw(context);
      board.ball.x = 240
      board.ball.y = 250
      board.ball.vx = 0
      board.ball.vy = 0
    }
  } else if (board.score >= 60){
    for (var h = 0; h < board.block2.length; h++){
      board.block2[h].draw(context);
    }
  } else {
    for (var i = 0; i < board.block.length; i++){
      board.block[i].draw(context);
    }
  }
}


function levelTwoBallRestart() {
  if (board.level == 2 && board.ball.vx == 4 && board.ball.vy == -4 && board.ball.x >= 240) {
    board.ball.vx = 6
    board.ball.vy = -6
  }
}



// function hitDetection () {
//   if (board.ball.y == 50) {
//     board.ball.straightDown()
//   }
// }.bind(board.ball)

canvas.addEventListener('mousemove', function(e) {
  var mouseLocation = e.offsetX;

  if (mouseLocation >= 475) {
    this.x = 450
  } else if (mouseLocation <= 25) {
    this.x = 0
  } else {
    this.x = (mouseLocation - 25)
  }

}.bind(board.paddle))




// canvas.addEventListener('mousemove', function(e) {
//   var mouseLocation = e.offsetX;
//
//   if (mouseLocation >= 275) {
//     this.x = 290
//   } else if (mouseLocation <= 25) {
//     this.x = 0
//   } else {
//     this.x = (mouseLocation - 5)
//   }
//
// }.bind(board.ball))


// canvas.addEventListener('click', function(e) {
//
//   if(this.y == 265) {
//     this.y -= 10
//   }
// }.bind(board.ball))
