var assert = require('chai').assert;
var Paddle = require('../lib/Paddle');

describe ('Paddle', function() {
  it ('should be function', function () {
    assert.isFunction(Paddle);
  })

  it ('should instantiate a new object', function () {
    var paddle = new Paddle ({});
    assert.isObject(paddle);
  })

  it ('should take height', function () {
    var paddle = new Paddle({height: 10});
    assert.equal(paddle.height, 10);
  })

  it ('should take width', function () {
    var paddle = new Paddle({height: 10, width: 50});
    assert.equal(paddle.width, 50);
  })

  it('should take x axis', function () {
    var paddle = new Paddle({x: 150, height: 10, width: 50});
    assert.equal(paddle.x, 150);
  })

  it('should have set y axis', function () {
    var paddle = new Paddle({heiht: 10, width: 50});
    assert.equal(paddle.y, 450);
  })



})
