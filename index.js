
var BOARDSETTINGS = {
  ROWS:12,
  COLUMNS: 20,
  SPEED: 250
}

var POSITIONS = [[10, 5], [10, 6], [10, 7], [10, 8]]

// var START = POSITIONS[0]
// var END = POSITIONS[POSITIONS.length - 1]

var SNAKE_SIZE = 0

var APPLE_POSITION = [[10, 8]]

var APPLE_OWNED = false
var LAST_DIRECTION = null
var GAME_OVER = false
var GAME_STARTED = false

var timerHandler
var directionHandler

window.onkeydown = (ev) => {
  console.log(ev.key)
  switch (ev.key) {
    case 'ArrowLeft':
    case 'a':
      if(LAST_DIRECTION !== 'RIGHT' && !GAME_OVER){
        if(!GAME_STARTED){
          timerHandler = setInterval(timer, 1000, 'timer')
          GAME_STARTED = true
        }
      LAST_DIRECTION = 'LEFT'
        clearInterval(directionHandler)
      directionHandler = setInterval(() => {handleSnake('left')}, BOARDSETTINGS.SPEED , 'left')
    }
      break
    case 'ArrowRight':
    case 'd':
      if(LAST_DIRECTION !== 'LEFT' && !GAME_OVER){
        if(!GAME_STARTED){
          timerHandler = setInterval(timer, 1000, 'timer')
          GAME_STARTED = true
        }
        LAST_DIRECTION = 'RIGHT'
        clearInterval(directionHandler)
      directionHandler = setInterval(() => {handleSnake('right')}, BOARDSETTINGS.SPEED, 'right')
    }
      break
    case 'ArrowUp':
    case 'w':
      if(LAST_DIRECTION !== 'DOWN' && !GAME_OVER){
        if(!GAME_STARTED){
          timerHandler = setInterval(timer, 1000, 'timer')
          GAME_STARTED = true
        }
      LAST_DIRECTION = 'UP'
        clearInterval(directionHandler)
      directionHandler = setInterval(() => {handleSnake('up')}, BOARDSETTINGS.SPEED, 'up')
    }
      break
    case 'ArrowDown':
    case 's':
      if(LAST_DIRECTION !== 'UP' && !GAME_OVER){
        if(!GAME_STARTED){
          timerHandler = setInterval(timer, 1000, 'timer')
          GAME_STARTED = true
        }
      LAST_DIRECTION = 'DOWN'
        clearInterval(directionHandler)
      directionHandler = setInterval(() => {handleSnake('down')}, BOARDSETTINGS.SPEED, 'down')
    }
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
      if(getApple()){
        expandSnake()
        SNAKE_SIZE += 1
        handlePontuation()
      }

}


function getElements(positions = POSITIONS) {
  elements = positions.map((item) => {
    return document.querySelector(`table 
                                      tr:nth-child(${item[0]}) 
                                      td:nth-child(${[item[1]]})`)
  })
  return elements
}

function expandSnake(positions = POSITIONS){
  const end = positions[positions.length - 1]
  if(LAST_DIRECTION === 'LEFT'){    
    var newPoint = [end[0], end[1] + 1] 
  }else{
    var newPoint = [end[0], end[1] - 1] 
  }
  positions.push(newPoint)
  POSITIONS = positions
  return positions
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
  newPoint = [start[0], (start[1] - 1)]
  if(newPoint[1] <= 0 || (POSITIONS.includes(newPoint))){
    clearInterval(directionHandler)
    clearInterval(timerHandler)
    GAME_OVER = true
    console.log('Voce perdeu')
  }else{    
    positions.pop()
    positions.unshift(newPoint)
    POSITIONS = positions
    return positions
  }
}


function moveToRight(positions = POSITIONS) {
  start = positions[0]
  newPoint = [start[0], (start[1] + 1)]
  if(newPoint[1] > BOARDSETTINGS.COLUMNS || (POSITIONS.includes(newPoint))){
    clearInterval(directionHandler)
    clearInterval(timerHandler)
    GAME_OVER = true
    console.log('Você perdeu')
  }else{
    positions.pop()
    positions.unshift(newPoint)
    POSITIONS = positions
    return positions
  }
}

function moveToUp(positions = POSITIONS) {
  start = positions[0]
  newPoint = [start[0] - 1, start[1]]
  if(newPoint[0] <= 0 || (POSITIONS.includes(newPoint))){
    clearInterval(directionHandler)
    clearInterval(timerHandler)
    GAME_OVER = true
    console.log('Voce perdeu')
  }else{    
    positions.pop()
    positions.unshift(newPoint)
    POSITIONS = positions
    return positions
  }
}

function moveToDown(positions = POSITIONS) {
  start = positions[0]
  newPoint = [start[0] + 1, start[1]]
  if(newPoint[0] > BOARDSETTINGS.ROWS || (POSITIONS.includes(newPoint))){
    clearInterval(directionHandler)
    clearInterval(timerHandler)
    GAME_OVER = true
    console.log('Voce perdeu')
  }else{    
    positions.pop()
    positions.unshift(newPoint)
    POSITIONS = positions
    return positions
  }
}

function getApple() {
  if ((POSITIONS[0][0] === APPLE_POSITION[0]) && (POSITIONS[0][1] === APPLE_POSITION[1])) {
    const oldApple = getElements([APPLE_POSITION])
    oldApple[0].classList.remove('apple')
    createAppleInBoard()
    return true
  } else {
    return false
  }
}

function createAppleInBoard() {
  const randomLine = Math.floor((Math.random() * BOARDSETTINGS.ROWS) + 1)
  const randomColumn = Math.floor((Math.random() * BOARDSETTINGS.COLUMNS) + 1)
  const appleElement = getElements([[randomLine, randomColumn]])
  console.log(randomLine, randomColumn)
  APPLE_POSITION = [randomLine, randomColumn]
  appleElement[0].classList.add('apple')
  
}

function handlePontuation(){
  const scoreboard = document.querySelector('#scoreboard')
  scoreboard.innerText = `Pontuação: ${SNAKE_SIZE}`
}


var hours = 0, minutes = 0, seconds = 0
function timer(display){
  seconds += 1
  if(seconds > 60){
    seconds = 0
    minutes += 1
  }
  if(minutes > 60){
    minutes = 0
    hours += 1
  }
  document.querySelector(`#${display}`).innerText = `Tempo: ${hours < 10 ? '0'+hours : hours}:${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`
}

window.onload = createAppleInBoard