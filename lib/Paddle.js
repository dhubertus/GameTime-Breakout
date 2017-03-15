function Paddle (options) {
  this.x = options.x || 145;
  this.y = 480;
  this.height = options.height || 10;
  this.width = options.width || 50;
}

Paddle.prototype.draw = function (context) {
  context.fillStyle = 'black';
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}

Paddle.prototype.move = function (direction) {
  this.x += direction.x;
  return this;
}



module.exports = Paddle;
