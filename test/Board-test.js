var assert = require('chai').assert
var Board  = require('../lib/Board')
var Levels = require('../lib/Levels')

describe('Board', function() {
  const canvas = document.createElement('canvas')
  const ctx    = canvas.getContext('2d')
  let board    = new Board({ ctx })

  it ('should be a function', () => {
    assert.isFunction(Board)
  })

  it ('should instantiate a new object', () => {
    assert.isObject(board)
  })

  it('should take a width', () => {
    assert.equal(board.width, 500)
  })

  it('should take a height', () => {
    assert.equal(board.height, 500)
  })

  it('should instantiate a new paddle', () => {
    assert.isObject(board.paddle)
    assert.equal(board.paddle.x, 225)
    assert.equal(board.paddle.height, 10)
    assert.equal(board.paddle.width, 50)
  })

  it('should have an array of level 1 blocks', () => {
    assert.lengthOf(board.block, 60)
  })

  it('should have array of blocks with width 50', () => {    // var board = new Board({})
    assert.equal(board.block[0].width, 50)
  })

  it('should have an array of blocks with height 25', () => {
    assert.equal(board.block[0].height, 25)
  })

  it('should have the first row painted redish but not the second', () => {    // var board = new Board({})
    assert.equal(board.block[0].color, '#bc3654')
    assert.notEqual(board.block[11].color, '#bc3654')
  })


  it('should have an array of level 2 blocks', () => {
    board.block  = new Levels().level2()
    assert.equal(board.block.length, 60)
  })

  it('should have an array level 2 blocks, each with width: 50 and height 25', () => {
    board.block  = new Levels().level2()
    assert.equal(board.block[0].width, 50)
    assert.equal(board.block[0].height, 25)
  })

  it('should have an array of blocks for winning', () => {
    board.block = new Levels().winGame()
    assert.lengthOf(board.block, 90)
  })

  it('should start on level one', () => {
    assert.equal(board.level, 1)
  })

  it('should have a score of 0 on start', () => {
    assert.equal(board.score, 0)
  })

  it('should have 5 lives on start', () => {
    assert.equal(board.lives, 5)
  })

  it('should instantiate a new ball object', () => {
    assert.isObject(board.ball)
    assert.equal(board.ball.x, 240)
    assert.equal(board.ball.y, 440)
    assert.equal(board.ball.width, 10)
    assert.equal(board.ball.height, 10)
    assert.equal(board.ball.color, '#bc3654')
  })
  //need a test for context???
})

describe('Board methods', () => {
  const canvas = document.createElement('canvas')
  const ctx    = canvas.getContext('2d')
  let board = new Board({ ctx })

  it('should stop and place ball on paddle for level 3 if score is >= 120', () => {
    board.score = 120
    board.drawBrickLoop()
    assert.equal(board.ball.x, 240)
    assert.equal(board.ball.y, 440)
    assert.equal(board.ball.vx, 0)
    assert.equal(board.ball.vy, 0)
  })

  it('should restart the ball when level 2 is reached', () => {
    board.level = 2
    board.ball.x = 250
    board.ball.vx = 4
    board.ball.vy = -4
    board.levelTwoBallRestart()
    assert.equal(board.ball.vx, 6)
    assert.equal(board.ball.vy, -6)
  })

  it('should detect collision on the top left corner of paddle', () => {
    let board    = new Board({ ctx })

    board.ball.vy = 4
    board.ball.vx = 4
    board.ball.x = 225
    board.ball.y = 445
    assert.equal(board.ball.vy, 4)
    board.paddleCollisionTopLeft()
    assert.equal(board.ball.vy, -4)
    assert.equal(board.ball.vx, -4)
  })

  it('should detect collision in the middle of the paddle', () => {
    let board = new Board({ ctx })

    board.ball.vy = 4
    board.ball.vx = 4
    board.ball.x = 250
    board.ball.y = 445
    board.paddleCollisionTopCenter()
    assert.equal(board.ball.vy, -4)
    assert.equal(board.ball.vx, 4)
  })

  it('should detect collison on the top right corner of the paddle', () => {
    let board = new Board({ ctx })

    board.ball.vy = 4
    board.ball.vx = -4
    board.ball.x  = 268
    board.ball.y  = 448
    board.paddleCollisionTopRight()
    assert.equal(board.ball.vx, 4)
    assert.equal(board.ball.vx, 4)
  })

  it('should detect collision with blocks', () => {
    let board = new Board({ ctx })

    board.ball.x = 25
    board.ball.y = 190
    board.ball.vx = -4
    board.ball.vy = -4
    board.blockCollision()
    assert.equal(board.ball.vy, 4)
  })

  it('should detect collision with level 2 blocks', () => {
    let board = new Board({ ctx })

    board.score = 61
    board.ball.x = 25
    board.ball.y = 190
    board.ball.vx = -4
    board.ball.vy = -4
    board.blockCollision()
    assert.equal(board.ball.vy, 4)
  })

  it('should move ball on gameover', () => {
    let board = new Board({ ctx })

    board.ball.vx = 4
    board.ball.vy = 4
    board.ball.y = 490
    board.ball.collision()
    assert.equal(board.ball.vy, 0)
    board.lives = 0
    assert.equal(board.lives, 0)
    board.restartBall()
    assert.equal(board.ball.x, 240)
    assert.equal(board.ball.y, 520)
    assert.equal(board.lives, 101)

  })
})
