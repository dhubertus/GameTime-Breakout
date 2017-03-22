class Ball {
  constructor({ height, width, x, y, color }) {
    this.height = height || 10
    this.width = width || 10
    this.x = x
    this.y = y
    this.color = color || '#bc3654'
    this.vx = 0
    this.vy = 0
  }


  draw(context) {
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.height, this.width)
    this.move()
    this.collision();
    return this
  }


  move() {
    this.x += this.vx
    this.y += this.vy
  }


  collision() {
    // this.x += this.vx
    // this.y += this.vy
    if (this.y + this.height < 0) {
      this.vy = -this.vy
    }
    if (this.y + this.height > 500 && this.y + this.height < 510 ) {
      this.y = this.y - 1
      this.vy = 0
      this.vx = 0
    }
    if (this.x + this.width < 10 || this.x + this.width >= 500) {
      this.vx = -this.vx
    }
    return this;
  }
}

module.exports = Ball;
