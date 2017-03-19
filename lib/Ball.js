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

// Ball.prototype.moveWithPaddle = function (direction) {
//   this.x += direction.x
//   return this
// };

// Ball.prototype.startRound = function (direction) {
//   context.fillStyle = this.color
//   context.fillRect(this.x, this.y, this.height, this.width)
//   this.vx = 0
//   this.vy = -5
//   return this
// };

// Ball.prototype.straightDown = function (direction) {
//   // this.x -= direction.x
//   this.y -= direction.y
//   return this
// };

// Ball.prototype.collision = function () {
//   this.x += this.vx
//   this.y += this.vy
//
//   if (this.y + this.vy < 0 || this.y + this.vy > 500) {
//     this.vy = -this.vy
//   }
//
//   if (this.x + this.vx < 0 || this.x + this.vx > 500) {
//     this.vx = -this.vx
//   }
//
//   // if (this.x == 0 || this.x == 500) {
//   //   (this.x)* -1
//   // }
//   return this;
// }

module.exports = Ball;
