let assert = require('chai').assert;
let Ball = require('../lib/Ball');

describe ('Ball', () => {
  it ('should be function', () => {
    assert.isFunction(Ball);
  })

  it ('should instantiate a new object', () => {
    let ball = new Ball ({});

    assert.isObject(ball);
  })

  it ('should take height', () => {
    let ball = new Ball({height: 10});

    assert.equal(ball.height, 10);
  })

  it ('should take width', () => {
    let ball = new Ball({height: 10, width: 10});

    assert.equal(ball.width, 10);
  })

  it ('should take x axis', () => {
    let ball = new Ball({x: 135, height: 10, width: 10});

    assert.equal(ball.x, 135);
  })

  it ('should have set y axis', () => {
    let ball = new Ball({x: 135, y: 60, height: 10, width: 50});

    assert.equal(ball.y, 60);
  })

  it ('should take a color', () => {
    let ball = new Ball({x: 135, y: 60, height: 10, width: 50, color: 'red'})

    assert.equal(ball.color, 'red')
  })

  it ('should change direction if ball crosses x axis', () => {
    let ball = new Ball({x: 135, y: 60, height: 10, width: 50, color: 'red'})

    ball.y = 0
    ball.vx = -4
    ball.vy = -4
    assert.equal(ball.vx, -4)
    ball.collision()
    assert.equal(ball.vx, 4)


  })
})
