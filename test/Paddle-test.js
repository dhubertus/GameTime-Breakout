let assert = require('chai').assert;
let Paddle = require('../lib/Paddle');

describe ('Paddle', () => {
  it ('should be function ', () => {
    assert.isFunction(Paddle);

  })

  it ('should instantiate a new object', () => {
    let paddle = new Paddle ({});

    assert.isObject(paddle);
  })

  it ('should take height', () => {
    let paddle = new Paddle({height: 10});

    assert.equal(paddle.height, 10);
  })

  it ('should take width', () => {
    let paddle = new Paddle({height: 10, width: 50});

    assert.equal(paddle.width, 50);
  })

  it ('should take x axis', () => {
    let paddle = new Paddle({x: 150, height: 10, width: 50});

    assert.equal(paddle.x, 150);
  })

  it ('should have set y axis', () => {
    let paddle = new Paddle({height: 10, width: 50});

    assert.equal(paddle.y, 450);
  })

  it ('has function move', () => {
    let paddle = new Paddle({height: 10, width: 50});

    assert.isFunction(paddle.move);
  })

  it ('function move changes x value', () => {
    let paddle = new Paddle({height: 10, width: 50});

    paddle.move()
    assert.equal(paddle.x, 51)
    console.log(paddle.x)
  })


})
