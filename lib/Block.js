class Block {
  constructor({ x, y, height, width, color }) {
    this.x      = x      || 0
    this.y      = y      || 0
    this.height = height || 25
    this.width  = width  || 50
    this.color  = color  || 'green'
  }

  draw(context) {
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.width, this.height)
    return this
  }
}

module.exports = Block
