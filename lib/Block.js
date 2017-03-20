// function Block (options) {
//   this.x = options.x || 0;
//   this.y = options.y || 0;
//   this.height = options.height || 25;
//   this.width = options.width;
//   this.color = options.color || 'green';
// }

class Block {
  constructor({ x, y, height, width, color }) {
    this.x = x || 0;
    this.y = y || 0;
    this.height = height || 25;
    this.width = width;
    this.color = color || 'green';
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }
}
// 
// Block.prototype.draw = function (context) {
//   context.fillStyle = this.color;
//   context.fillRect(this.x, this.y, this.width, this.height);
//   return this;
// }


module.exports = Block;
