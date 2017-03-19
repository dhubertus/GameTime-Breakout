function Block (options) {
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.height = options.height || 25;
  this.width = options.width;
  this.color = options.color || 'green';
}

Block.prototype.draw = function (context) {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
  return this;
}


module.exports = Block;
