var assert = require('chai').assert;
var Ball = require('../lib/Ball');

describe ('Ball', function() {
  it ('should be function', function () {
    assert.isFunction(Ball);
  })

  it ('should instantiate a new object', function () {
    var ball = new Ball ({});
    assert.isObject(ball);
  })

  it ('should take height', function () {
    var ball = new Ball({height: 10});
    assert.equal(ball.height, 10);
  })

  it ('should take width', function () {
    var ball = new Ball({height: 10, width: 10});
    assert.equal(ball.width, 10);
  })

  it('should take x axis', function () {
    var ball = new Ball({x: 135, height: 10, width: 10});
    assert.equal(ball.x, 135);
  })

  it('should have set y axis', function () {
    var ball = new Ball({x: 135, y:60, height: 10, width: 50});
    assert.equal(ball.y, 60);
  })

  it('should take a color', function () {
    var ball = new Ball({x:135, y:60, height: 10, width: 50, color: 'red'})
    assert.equal(ball.color, 'red')
  })

  it('should go up', function() {
    var ball = new Ball({x:135, y:60, height: 10, width: 50, color: 'red'})
    // call prototype on ball that pushes ball up
    assert.equal(ball.x, 140)
  })
})
