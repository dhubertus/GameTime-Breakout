function Ball(options) {
  this.height = options.height || 10
  this.width = options.width || 10
  this.x = options.x
  this.y = options.y
  this.color = options.color
}

Ball.prototype.draw = function (context) {
  context.fillStyle = this.color
  context.fillRect(this.x, this.y, this.height, this.width)
  return this
};

Ball.prototype.moveWithPaddle = function (direction) {
  this.x += direction.x
  return this
};

Ball.prototype.startRound = function (direction) {
  thix.y += direction.y
  return this
};

module.exports = Ball;
