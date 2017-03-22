const Block = require('./Block.js');


class Levels {
  // constructor() {
  //
  // }

  level1() {
    let blockArray = []
    let z = 1;
    let c = -1

    for (let i = 0; i < 60; i++) {
      let x = (i % 10) * 50

      if (i % 10 === 0) {
        z++
        c++
      }
      let y = z * 25
      let blockColors = ['#bc3654', '#bc2e24', '#bc4b24', '#bcae24', '#24be24', '#2436bc']

      blockArray.push(new Block({x, y, width: 50, height: 25, color: blockColors[c]}))

    }
    return blockArray
  }

  level2() {
    let blockArray2 = []
    let z = 1;
    let c = -1

    for (let i = 0; i < 60; i++) {
      let x = (i % 10) * 50

      if (i % 10 === 0) {
        z++
        c++
      }
      let y = z * 25
      let blockColors = ['white', 'green', 'red', 'orange', 'yellow', 'purple']

      blockArray2.push(new Block({x, y, width: 50, height: 25, color: blockColors[c]}))
    }
    return blockArray2
  }

  winGame() {
    let winArray = [
      1, 0, 0, 0, 1, 2, 1, 0, 0, 1,
      1, 0, 0, 0, 1, 2, 1, 0, 0, 1,
      1, 0, 1, 0, 1, 2, 1, 1, 0, 1,
      1, 0, 1, 0, 1, 2, 1, 1, 0, 1,
      1, 0, 1, 0, 1, 2, 1, 1, 1, 1,
      1, 0, 1, 0, 1, 2, 1, 0, 1, 1,
      1, 1, 1, 1, 1, 2, 1, 0, 1, 1,
      1, 1, 0, 1, 1, 2, 1, 0, 0, 1,
      1, 0, 0, 0, 1, 2, 1, 0, 0, 1]

    let z = 1;

    for (let i = 0; i < 90; i++) {
      let x = (i % 10) * 50

      if (i % 10 === 0) {
        z++
      }
      let y = z * 25

      if (winArray[i] == 0) {
        winArray.splice(i, 1, new Block({x, y, width: 50, height: 25, color: '#040204'}))
      } else if (winArray[i] == 1) {
        winArray.splice(i, 1, new Block({x, y, width: 50, height: 25, color: '#bc3654'}))
      } else if (winArray[i] == 2) {
        winArray.splice(i, 1, new Block({x, y, width: 50, height: 25, color: '#bc4b24'}))
      }
    }
    return winArray
  }
}

module.exports = Levels;
