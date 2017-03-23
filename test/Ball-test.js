let assert = require('chai').assert
let Ball   = require('../lib/Ball')

describe ('Ball', () => {
  let ball = new Ball({x: 135, y: 60, height: 10, width: 50, color: 'red'})

  it ('should be function', () => {
    assert.isFunction(Ball)
  })

  it ('should instantiate a new object', () => {
    assert.isObject(ball)
  })

  it ('should take height', () => {
    assert.equal(ball.height, 10)
  })

  it ('should take width', () => {
    let ball = ({height: 10, width: 10})

    assert.equal(ball.width, 10)
  })

  it ('should take x axis', () => {
    let ball = ({x: 135, height: 10, width: 10})

    assert.equal(ball.x, 135)
  })

  it ('should take y axis', () => {
    let ball = ({x: 135, y: 60, height: 10, width: 50})

    assert.equal(ball.y, 60)
  })

  it ('should take a color', () => {
    let ball = ({color: 'blue'})

    assert.equal(ball.color, 'blue')
  })

  it ('should change direction if ball hits the top of the board', () => {
    let ball = new Ball({x: 0, y: 1})

    ball.vy = -4
    assert.equal(ball.vy, -4)
    ball.y = -2
    ball.collision()
    assert.equal(ball.vy, 4)
  })

  it ('should change direction if it hits the left side of the board', () => {
    let ball = new Ball({x: 20, y: 0})

    ball.vx = -3
    assert.equal(ball.vx, -3)
    ball.x = -2
    ball.collision()
    assert.equal(ball.vx, 3)
  })

  it ('should change direction if it hits the right side of the board', () => {
    let ball = new Ball({x: 490, y: 0})

    ball.vx = 3
    assert.equal(ball.vx, 3)
    ball.x = 500
    ball.collision()
    assert.equal(ball.vx, -3)
  })

  it ('should stop if it hits the bottom of the board', () => {
    let ball = new Ball({x: 0, y: 495, height: 10})

    ball.vy = 4
    ball.vx = -4
    assert.equal(ball.vy, 4)
    ball.y = 505
    ball.collision()
    assert.equal(ball.vy, 0)
  })
})
