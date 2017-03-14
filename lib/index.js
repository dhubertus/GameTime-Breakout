const Paddle = require('./Paddle.js');

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var paddle = new Paddle({x: 125, height: 10, width: 50});

paddle.draw(context);
