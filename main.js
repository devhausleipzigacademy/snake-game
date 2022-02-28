///////////////////////
//// Prepare Board ////
///////////////////////

const snakeGrid = document.querySelector('#snake-grid')
const messages = document.querySelector('#messages')

const rows = 21;
const columns = 21;

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
        const gridSquare = document.createElement('div');
        gridSquare.id = `xy_${i}-${j}`
        gridSquare.classList.add('grid-square')
        snakeGrid.appendChild(gridSquare)
    }
}


///////////////////////////////
//// Initialize Game State ////
///////////////////////////////

// array of coordinates specifying snake
// first element is always head of snake
// last element is tail of snake
const snake = ['xy_11-11', 'xy_12-11', 'xy_13-11'];

// top left starting
// +1 for rows is downward, -1 is upwards
// +1 for columns is rightward, -1 is leftward
const snakeDirection = {
    "v": -1,
    "h": 0
}

// array of coordinates specifying apples
const [appleRow, appleColumn] = randomCoordinate(rows, columns)
const newApple = `xy_${appleRow}-${appleColumn}`

const apples = [newApple];


///////////////////////////
//// State Transitions ////
///////////////////////////

// color snake squares
snake.forEach( (coordinate) => {
    console.log(coordinate)
    const square = document.querySelector(`#${coordinate}`);

    console.log(square)
    styleSquare(square, 'snake-square')
})


// color apple squares
apples.forEach( (coordinate) => {
    const square = document.querySelector(`#${coordinate}`);
    styleSquare(square, 'apple-square')
})

// change direction of movement on arrow keys
// need to make sure you can't move backwards

// generate apples if there are no apples
// make sure apple doesn't spawn where snake already is


// move snake in direction
// we need to remove an old snake square from the end of the snake
// if next snake square is out of bounds, wrap around to other side
function moveSnake () {
    const head = snake[0]
    const tail = snake[snake.length-1]

    const headVH = head.replace('xy_', '').split('-');
    const newV = Number(headVH[0]) + snakeDirection.v;
    const newH = Number(headVH[1]) + snakeDirection.h;
    console.log(newV, newH)

    const newSnakeV = mod(newV, rows)
    const newSnakeH = mod(newH, columns)

    const newSnakeVH = `xy_${newSnakeV}-${newSnakeH}`;
    
    // add new snake head to snake array
    snake.unshift(newSnakeVH)

    // add styling to new snake head
    const newSnakeSquare = document.querySelector(`#${newSnakeVH}`)
    styleSquare(newSnakeSquare, 'snake-square')

    // remove styling from tail square
    const tailSquare = document.querySelector(`#${tail}`)
    styleSquare(tailSquare, 'snake-square')

    // remove tail from snake array
    snake.pop()
}

// check if new snake square is already snake square
// if new snake square is alredy snake square, reset game

// check if new snake square is already apple square
// if new snake square is apple square, remove apple square and increase length of snake by 1


///////////////////
//// Game Loop ////
///////////////////

let previousTimeStamp;
let done = false

function gameLoop(){
    const currTime = new Date().getTime();

    if (previousTimeStamp === undefined) {
        previousTimeStamp = currTime;
    }
    const elapsed = currTime - previousTimeStamp;

    console.log('elapse', elapsed)

    if (elapsed > 1000) {
        updateGameState();
        previousTimeStamp = currTime
    }

    if(!done){
        window.requestAnimationFrame(gameLoop);
    } else {
        return;
    }
}

function updateGameState(){
    console.log('Hello!')
    // call checks and transitions here
    moveSnake()
}

gameLoop();