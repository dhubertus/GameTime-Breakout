var assert = require('chai').assert;
var Block = require('../lib/Block');

describe ('Block', function() {
  it ('should be function', function () {
    assert.isFunction(Block);
  })

  it ('should instantiate a new object', function () {
    var block = new Block ({});
    assert.isObject(block);
  })

  it ('should take x axis', function (){
    var block = new Block ({x: 0});
    assert.equal(block.x, 0);
  })

  it ('should take y axis', function (){
    var block = new Block ({x: 0, y: 0});
    assert.equal(block.y, 0);
  })

  it ('should take height', function () {
    var block = new Block ({x: 0, y: 0, height: 10});
    assert.equal(block.height, 10);
  })

  it ('should take width', function () {
    var block = new Block ({x: 0, y: 0, height: 10, width: 300});
    assert.equal(block.width, 300);
  })

  it ('should take color', function () {
    var block = new Block ({x: 0, y: 0, height: 10, width: 300, color: 'green'});
    assert.equal(block.color, 'green');
  })

})
