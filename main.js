///////////////////////
//// Prepare Board ////
///////////////////////

const snakeGrid = document.querySelector('#snake-grid')
const messages = document.querySelector('#messages')

const rows = 21;
const columns = 21;

for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
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
    "vertical": -1,
    "horizontal": 0
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

// generate apples if there are no apples
// make sure apple doesn't spawn where snake already is

// move snake in direction
// we need to remove an old snake square from the end of the snake
// if next snake square is out of bounds, wrap around to other side
const head = snake[0]
const tail = snake[snake.length-1]

switch (`${snakeDirection.vertical},${snakeDirection.horizontal}`) {
    case '-1,0':
        // const headXY = head.replace('xy_', '').split('-');
        // const newSnakeY = headXY[0];
        // const newSnakeX = headXY[1];
        // const newSnakeXY = `xy_${newSnakeY-1}-${newSnakeX}`;

        // // add styling to new snake head
        // const newSnakeSquare = document.querySelector(`#${newSnakeXY}`)
        // styleSquare(newSnakeSquare, 'snake-square')

        // // remove styling from tail square
        // const tailSquare = document.querySelector(`#${tail}`)
        // styleSquare(tailSquare, 'snake-square')

        // // remove tail from snake array
        // snake.pop()
        break;
    case '1, 0':
        break;
    case '0, -1':
        break;
    case '0, 1':
        break;
}

// check if new snake square is already snake square
// if new snake square is alredy snake square, reset game

// check if new snake square is already apple square
// if new snake square is apple square, remove apple square and increase length of snake by 1


///////////////////
//// Game Loop ////
///////////////////

function gameLoop() {
    // call checks and transitions here

    setInterval(gameLoop, 100)
}

gameLoop();

