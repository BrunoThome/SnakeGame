
const default_position = {
  START_POSITION_X: 3,
  START_POSITION_Y: 3,
}

var POSITIONS = [[10, 5], [10, 6], [10, 7], [10, 8]]

// var START = POSITIONS[0]
// var END = POSITIONS[POSITIONS.length - 1]

var SNAKE_SIZE = 3

var APPLE_POSITION = [[10, 8]]

var APPLE_OWNED = false

var LAST_DIRECTION = null

var downHandler
var upHandler
var leftHandler
var rightHandler

window.onkeydown = (ev) => {
  switch (ev.key) {
    case 'ArrowLeft':
        clearInterval(leftHandler)
        clearInterval(rightHandler)
        clearInterval(upHandler)
        clearInterval(downHandler)
      leftHandler = setInterval(() => {handleSnake('left')}, 500 , 'left')
      break
    case 'ArrowRight':
        clearInterval(leftHandler)
        clearInterval(rightHandler)
        clearInterval(upHandler)
        clearInterval(downHandler)
      rightHandler = setInterval(() => {handleSnake('right')}, 500, 'right')
      break
    case 'ArrowUp':
        clearInterval(leftHandler)
        clearInterval(rightHandler)
        clearInterval(upHandler)
        clearInterval(downHandler)
      upHandler = setInterval(() => {handleSnake('up')}, 500, 'up')
      break
    case 'ArrowDown':
        clearInterval(leftHandler)
        clearInterval(rightHandler)
        clearInterval(upHandler)
        clearInterval(downHandler)
      downHandler = setInterval(() => {handleSnake('down')}, 500, 'down')
      break
  }

}

function handleSnake(direction){
      var oldElements = getElements(POSITIONS)
      removeMarkAsSnake(oldElements)
      switch(direction){
        case 'left':
            var positions = moveToLeft()
            break
        case 'right':
            var positions = moveToRight()
            break       
        case 'up':
            var positions = moveToUp()
            break
        case 'down':
            var positions = moveToDown()
            break
      
    }      
      var elements = getElements(positions)
      markPointAsSnake(elements)
}

// while(true){
//   setInterval(moveToLeft)
// }

// window.onload = createAppleInBoard

function getElements(positions = POSITIONS) {
  elements = positions.map((item) => {
    return document.querySelector(`table 
                                      tr:nth-child(${item[0]}) 
                                      td:nth-child(${[item[1]]})`)
  })
  return elements
}

function markPointAsSnake(elements) {
  elements.forEach(item => {
    item.classList.add('td-full')
  })
}

function removeMarkAsSnake(elements) {
  elements.forEach(item => {
    item.classList.remove('td-full')
  })
}

function moveToLeft(positions = POSITIONS) {
  start = positions[0]
  end = positions[positions.length - 1]
  newPoint = [start[0], (start[1] - 1)]
  positions.pop()
  positions.unshift(newPoint)
  POSITIONS = positions
  return positions
}



function moveToRight(positions = POSITIONS) {
  start = positions[0]
  end = positions[positions.length - 1]
  newPoint = [start[0], (start[1] + 1)]
  positions.pop()
  positions.unshift(newPoint)
  POSITIONS = positions
  return positions
}

function moveToUp(positions = POSITIONS) {
  start = positions[0]
  end = positions[positions.length - 1]
  newPoint = [start[0] - 1, start[1]]
  positions.pop()
  positions.unshift(newPoint)
  POSITIONS = positions
  return positions
}

function moveToDown(positions = POSITIONS) {
  start = positions[0]
  end = positions[positions.length - 1]
  newPoint = [start[0] + 1, start[1]]
  positions.pop()
  positions.unshift(newPoint)
  POSITIONS = positions
  return positions
}

function getApple(snake_position, apple_position = APPLE_POSITION) {
  if ((snake_position[0] === apple_position[0]) && (snake_position[1] === apple_position[1])) {
    const oldApple = getElements([APPLE_POSITION])
    oldApple[0].classList.remove('apple')
    createAppleInBoard()
    return true
  } else {
    return false
  }
}

function createAppleInBoard() {
  const randomLine = 10
  const randomColumn = Math.floor((Math.random() * 10) + 1)
  const appleElement = getElements([[randomLine, randomColumn]])
  APPLE_POSITION = [randomLine, randomColumn]
  appleElement[0].classList.add('apple')
}

// function startGameSettings(default_position = default_position){
//   const initial_point = document.querySelector(`table 
//                                                 tr:nth-child(${default_position.START_POSITION_Y}) 
//                                                 td:nth-child(${default_position.START_POSITION_X})`)
//   initial_point.classList.add('td-full')

// }
