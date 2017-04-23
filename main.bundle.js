/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(1);
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	let board = new Board({ ctx });
	let mute = document.getElementById('mute');

	requestAnimationFrame(function gameloop(timer) {
	  board.gameDraw(timer);
	  if (board.lives > -1) {
	    requestAnimationFrame(gameloop);
	  }
	});

	window.addEventListener('click', function () {
	  if (board.ball.x == 240 && board.ball.y == 440) {
	    board.ball.ballStartVelocity();
	  }
	});

	window.addEventListener('keydown', function (event) {
	  if (event.keyCode <= 222 && board.ball.x == 240 && board.ball.y == 440 || event.key == typeof str) {
	    board.ball.ballStartVelocity();
	  }
	});

	canvas.addEventListener('mousemove', function (e) {
	  let mouseLocation = e.offsetX;

	  if (mouseLocation >= 475) {
	    this.x = 450;
	  } else if (mouseLocation <= 25) {
	    this.x = 0;
	  } else {
	    this.x = mouseLocation - 25;
	  }
	}.bind(board.paddle));

	window.addEventListener('keydown', function (event) {
	  if (event.key == 'ArrowRight') {
	    board.paddle.x + board.paddle.width > 450 ? board.paddle.x = 450 : board.paddle.x += 40;
	  } else if (event.key == 'ArrowLeft') {
	    board.paddle.x < 50 ? board.paddle.x = 0 : board.paddle.x -= 40;
	  }
	});

	mute.addEventListener('click', function () {
	  board.gameplaySound.paused ? board.gameplaySound.play() : board.gameplaySound.pause();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Paddle = __webpack_require__(2);
	const Ball = __webpack_require__(3);
	const Levels = __webpack_require__(4);
	let start = null;

	class Board {
	  constructor({ ctx }) {
	    this.width = 500;
	    this.height = 500;
	    this.paddle = new Paddle({ x: 225, height: 10, width: 50 });
	    this.block = new Levels().level1();
	    this.level = 1;
	    this.score = 0;
	    this.lives = 5;
	    this.ball = new Ball({ x: 240, y: 440, width: 10, height: 10, color: '#bc3654' });
	    this.context = ctx;

	    this.blockDestroySound = new Audio("../sounds/Explosion6.wav");
	    this.paddleHitSound = new Audio("../sounds/sfx_sounds_impact13.wav");
	    this.gameplaySound = new Audio("../sounds/Visager_-_04_-_Factory_Time.mp3");
	  }

	  drawBrickLoop() {
	    if (this.score === 120) {
	      for (let j = 0; j < 90; j++) {
	        this.block = new Levels().winGame();
	        this.block[j].draw(this.context);
	        this.ball.x = 240;
	        this.ball.y = 440;
	        this.ball.vx = 0;
	        this.ball.vy = 0;
	      }
	    } else if (this.score == 60) {
	      for (let i = 0; i < 60; i++) {
	        this.block = new Levels().level2();
	        this.block[i].draw(this.context);
	        this.ball.color = '#00BFFF';
	      }
	    } else if (this.score == 0) {
	      for (let i = 0; i < this.block.length; i++) {
	        this.block[i].draw(this.context);
	      }
	    } else {
	      for (let i = 0; i < this.block.length; i++) {
	        this.block[i].draw(this.context);
	      }
	    }
	  }

	  blockCollision() {
	    for (let i = 0; i < this.block.length; i++) {
	      if (this.ball.x + this.ball.width >= this.block[i].x && this.ball.x - this.ball.width <= this.block[i].x + this.block[i].width && this.ball.y + this.ball.height >= this.block[i].y && this.ball.y + this.ball.height <= this.block[i].y + this.block[i].height) {
	        this.ball.vy = -this.ball.vy;
	        this.block.splice(i, 1);
	        this.changeScoreAndLevel();
	        this.blockDestroySound.play();
	      }
	    }
	  }

	  levelTwoBallRestart() {
	    if (this.level == 2 && this.ball.vx == 4 && this.ball.vy == -4 && this.ball.x >= 240) {
	      this.ball.vx = 6;
	      this.ball.vy = -6;
	    }
	  }

	  lifeCounter() {
	    let lives = document.getElementById('lives');

	    this.lives--;
	    lives.innerText = this.lives;
	  }

	  changeScoreAndLevel() {
	    let scoreHtml = document.getElementById('score');
	    let levelHtml = document.getElementById('level');

	    this.score++;
	    scoreHtml.innerText = this.score;

	    if (this.score == 60) {
	      this.level++;
	      levelHtml.innerText = this.level;
	      this.ball.x = 240;
	      this.ball.y = 440;
	      this.ball.vy = -4;
	    }
	  }

	  paddleCollisionTopLeft() {
	    if (this.ball.x <= this.paddle.x + 10 && this.ball.x + this.ball.width >= this.paddle.x && this.ball.y < this.paddle.y + this.paddle.height && this.ball.height + this.ball.y > this.paddle.y) {
	      this.ball.vy = -this.ball.vy;

	      if (this.ball.vx > 0) {
	        this.ball.vx = -this.ball.vx;
	        this.paddleHitSound.play();
	      }
	    }
	  }

	  paddleCollisionTopCenter() {
	    if (this.ball.x <= this.paddle.x + 10 + (this.paddle.width - 20) && this.ball.x > this.paddle.x + 10 && this.ball.y < this.paddle.y + this.paddle.height && this.ball.height + this.ball.y > this.paddle.y) {
	      this.ball.vy = -this.ball.vy;
	      this.paddleHitSound.play();
	    }
	  }

	  paddleCollisionTopRight() {
	    if (this.ball.x < this.paddle.x + 40 + (this.paddle.width - 40) && this.ball.x > this.paddle.x + 40 && this.ball.y < this.paddle.y + this.paddle.height && this.ball.height + this.ball.y > this.paddle.y) {
	      this.ball.vy = -this.ball.vy;

	      if (this.ball.vx < 0) {
	        this.ball.vx = -this.ball.vx;
	        this.paddleHitSound.play();
	      }
	    }
	  }

	  restartBall(timer) {
	    if (this.ball.vx === 0 && this.ball.vy === 0 && this.ball.y == 491 && !start) {
	      start = timer;
	    }

	    let delay = timer - start;

	    if (this.ball.vx === 0 && this.ball.vy === 0 && this.ball.y == 489 && delay > 1500) {
	      this.ball.x = 240;
	      this.ball.y = 440;
	      start = null;
	      this.lifeCounter();
	    }

	    if (this.ball.vx === 0 && this.ball.vy === 0 && this.ball.y == 489 && 0 < this.lives < 5) {
	      if (this.lives == 0) {
	        let result = confirm('Game Over. Want to Play Again?');

	        this.ball.vx = 0;
	        this.ball.vy = 0;
	        this.ball.x = 240;
	        this.ball.y = 520;
	        this.lives = 101;
	        if (result == true) {
	          window.location.reload(true);
	        }
	      }
	    }
	  }

	  gameDraw(timer) {
	    this.context.clearRect(0, 0, canvas.width, canvas.height);
	    this.paddle.draw(this.context);
	    this.ball.draw(this.context);
	    this.paddleCollisionTopCenter();
	    this.paddleCollisionTopLeft();
	    this.paddleCollisionTopRight();
	    this.drawBrickLoop();
	    this.blockCollision();
	    this.levelTwoBallRestart();
	    this.restartBall(timer, this.context);
	  }
	}

	module.exports = Board;

/***/ },
/* 2 */
/***/ function(module, exports) {

	class Paddle {
	  constructor({ x, y, height, width }) {
	    this.x = x || 225;
	    this.y = y || 450;
	    this.height = height || 10;
	    this.width = width || 50;
	  }

	  draw(context) {
	    context.fillStyle = '#bc3654';
	    context.fillRect(this.x, this.y, this.width, this.height);
	    return this;
	  }
	}

	module.exports = Paddle;

/***/ },
/* 3 */
/***/ function(module, exports) {

	class Ball {
	  constructor({ height, width, x, y, color }) {
	    this.height = height || 10;
	    this.width = width || 10;
	    this.x = x;
	    this.y = y;
	    this.color = color || '#bc3654';
	    this.vx = 0;
	    this.vy = 0;
	  }

	  draw(context) {
	    context.fillStyle = this.color;
	    context.fillRect(this.x, this.y, this.height, this.width);
	    this.move();
	    this.collision();
	    return this;
	  }

	  move() {
	    this.x += this.vx;
	    this.y += this.vy;
	  }

	  collision() {
	    if (this.y <= 0) {
	      this.vy = -this.vy;
	    }
	    if (this.y + this.height >= 500) {
	      this.y = this.y - 1;
	      this.vy = 0;
	      this.vx = 0;
	    }
	    if (this.x <= 0 || this.x + this.width >= 500) {
	      this.vx = -this.vx;
	    }
	    return this;
	  }

	  ballStartVelocity() {
	    this.vx = 4;
	    this.vy = -4;
	  }
	}

	module.exports = Ball;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Block = __webpack_require__(5);

	class Levels {
	  level1() {
	    let blockArray = [];
	    let z = 1;
	    let c = -1;

	    for (let i = 0; i < 60; i++) {
	      let x = i % 10 * 50;

	      if (i % 10 === 0) {
	        z++;
	        c++;
	      }
	      let y = z * 25;
	      let blockColors = ['#bc3654', '#bc2e24', '#bc4b24', '#bcae24', '#24be24', '#2436bc'];

	      blockArray.push(new Block({ x, y, width: 50, height: 25, color: blockColors[c] }));
	    }
	    return blockArray;
	  }

	  level2() {
	    let blockArray = [];
	    let z = 1;
	    let c = -1;

	    for (let i = 0; i < 60; i++) {
	      let x = i % 10 * 50;

	      if (i % 10 === 0) {
	        z++;
	        c++;
	      }
	      let y = z * 25;
	      let blockColors = ['#2436bc', '#24be24', '#bcae24', '#bc4b24', '#bc2e24', '#bc3654'];

	      blockArray.push(new Block({ x, y, width: 50, height: 25, color: blockColors[c] }));
	    }
	    return blockArray;
	  }

	  winGame() {
	    let winArray = [1, 0, 0, 0, 1, 2, 1, 0, 0, 1, 1, 0, 0, 0, 1, 2, 1, 0, 0, 1, 1, 0, 1, 0, 1, 2, 1, 1, 0, 1, 1, 0, 1, 0, 1, 2, 1, 1, 0, 1, 1, 0, 1, 0, 1, 2, 1, 1, 1, 1, 1, 0, 1, 0, 1, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 0, 1, 1, 2, 1, 0, 0, 1, 1, 0, 0, 0, 1, 2, 1, 0, 0, 1];

	    let z = 1;

	    for (let i = 0; i < 90; i++) {
	      let x = i % 10 * 50;

	      if (i % 10 === 0) {
	        z++;
	      }
	      let y = z * 25;

	      if (winArray[i] == 0) {
	        winArray.splice(i, 1, new Block({ x, y, width: 50, height: 25, color: '#040204' }));
	      } else if (winArray[i] == 1) {
	        winArray.splice(i, 1, new Block({ x, y, width: 50, height: 25, color: '#bc3654' }));
	      } else if (winArray[i] == 2) {
	        winArray.splice(i, 1, new Block({ x, y, width: 50, height: 25, color: '#bc4b24' }));
	      }
	    }
	    return winArray;
	  }
	}

	module.exports = Levels;

/***/ },
/* 5 */
/***/ function(module, exports) {

	class Block {
	  constructor({ x, y, height, width, color }) {
	    this.x = x || 0;
	    this.y = y || 0;
	    this.height = height || 25;
	    this.width = width || 50;
	    this.color = color || 'green';
	  }

	  draw(context) {
	    context.fillStyle = this.color;
	    context.fillRect(this.x, this.y, this.width, this.height);
	    return this;
	  }
	}

	module.exports = Block;

/***/ }
/******/ ]);