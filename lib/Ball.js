function Ball(options) {
  this.height = options.height || 10
  this.width = options.width || 10
  this.x = options.x
  this.y = options.y
  this.color = options.color || '#bc3654'
  this.vx = 4
  this.vy = -4
}

Ball.prototype.draw = function (context) {
  context.fillStyle = this.color
  context.fillRect(this.x, this.y, this.height, this.width)
  this.collision();
  return this
};

Ball.prototype.collision = function () {
  this.x += this.vx
  this.y += this.vy
  if (this.y + this.height < 0) {
    this.vy = -this.vy
  }
  if(this.y + this.height > 500 && this.y + this.height < 510 ) {
    this.y = this.y - 1
    this.vy = 0
    this.vx = 0
    // gameOverSound.play()
  }
  if (this.x + this.width < 10 || this.x + this.width > 500) {
    this.vx = -this.vx
  }
  return this;
}

module.exports = Ball;
