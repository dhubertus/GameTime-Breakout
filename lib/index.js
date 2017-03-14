const Paddle = require('./Paddle.js');

var direction
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var paddle = new Paddle({x: 125, height: 10, width: 50});

paddle.draw(context);


requestAnimationFrame(function gameloop () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.move({x: 0, y: 0}).draw(context);

  requestAnimationFrame(gameloop);
})

canvas.addEventListener('mousemove', function(e) {
  var x = e.offsetX;
  // debugger;
  this.x = x
  // we need to make move accept the var x value


}.bind(paddle))
