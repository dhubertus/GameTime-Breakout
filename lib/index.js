const Board = require('./Board.js');

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var board = new Board()
// var paddle = new Paddle({x: 125, height: 10, width: 50});

board.paddle.draw(context);


requestAnimationFrame(function gameloop () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  board.paddle.move({x: 0, y: 0}).draw(context);

  requestAnimationFrame(gameloop);
})

canvas.addEventListener('mousemove', function(e) {
  var x = e.offsetX;
  // debugger;
  this.x = (x - 25)
  // we need to make move accept the var x value


}.bind(board.paddle))
