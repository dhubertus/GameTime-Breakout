class Paddle {
  constructor({ x, y, height, width}) {
    this.x = x || 50
    this.y = y || 450
    this.height = height || 10
    this.width = width || 50
  }

  draw(context) {
    context.fillStyle = '#bc3654';
    context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  move(direction) {
    this.x += direction.x;
    return this;
  }
}


module.exports = Paddle;
