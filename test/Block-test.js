let assert = require('chai').assert;
let Block = require('../lib/Block');

describe ('Block', () => {
  it ('should be function', () => {
    assert.isFunction(Block);
  })

  it ('should instantiate a new object', () => {
    let block = new Block ({});

    assert.isObject(block);
  })

  it ('should take x axis', () => {
    let block = new Block ({x: 0});

    assert.equal(block.x, 0);
  })

  it ('should take y axis', () => {
    let block = new Block ({x: 0, y: 0});

    assert.equal(block.y, 0);
  })

  it ('should take height', () => {
    let block = new Block ({x: 0, y: 0, height: 10});

    assert.equal(block.height, 10);
  })

  it ('should take width', () => {
    let block = new Block ({x: 0, y: 0, height: 10, width: 300});

    assert.equal(block.width, 300);
  })

  it ('should take color', () => {
    let block = new Block ({x: 0, y: 0, height: 10, width: 300, color: 'green'});

    assert.equal(block.color, 'green');
  })

})
