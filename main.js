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

const defaultDelay = 200; // ms

// array of coordinates specifying snake
// first element is always head of snake
// last element is tail of snake
const defaultSnake = ['xy_11-11', 'xy_12-11', 'xy_13-11'];

// top left starting
// +1 for rows is downward, -1 is upwards
// +1 for columns is rightward, -1 is leftward
const defaultSnakeDirection = {
    "v": -1,
    "h": 0
}

// array of coordinates specifying apples
function getApple(){
    const [appleRow, appleColumn] = randomCoordinate(rows, columns)
    return `xy_${appleRow}-${appleColumn}`;
}

// sound effects
const appleBite = new Audio('assets/audio/apple-bite.mp3');
appleBite.playbackRate = 1.5;

let delay = defaultDelay;
let score = 0;
let apples = [getApple()];
let snake = defaultSnake.slice(0)
let snakeDirection = Object.assign({}, defaultSnakeDirection);

///////////////////////////
//// State Transitions ////
///////////////////////////

// color snake squares
snake.forEach( (coordinate) => {
    const square = document.querySelector(`#${coordinate}`);
    styleSquare(square, 'snake-square')
})


// color apple squares
apples.forEach( (coordinate) => {
    const square = document.querySelector(`#${coordinate}`);
    styleSquare(square, 'apple-square')
})

// change direction of movement when pressing arrow keys
// make sure you can't move backwards
document.addEventListener('keydown', (event) => {
    switch (event.key){
        case 'ArrowLeft':
            if(snakeDirection.v == 0 && snakeDirection.h == 1) {
                break;
            } else {
                snakeDirection.v = 0;
                snakeDirection.h = -1;
            }
            break;
        case 'ArrowUp':
            if(snakeDirection.v == 1 && snakeDirection.h == 0) {
                break;
            } else {
                snakeDirection.v = -1;
                snakeDirection.h = 0;
            }
            break;
        case 'ArrowRight':
            if(snakeDirection.v == 0 && snakeDirection.h == -1) {
                break;
            } else {
                snakeDirection.v = 0;
                snakeDirection.h = 1;
            }
            break;
        case 'ArrowDown':
            if(snakeDirection.v == -1 && snakeDirection.h == 0) {
                break;
            } else {
                snakeDirection.v = 1;
                snakeDirection.h = 0;
            }
            break;
    }
})

// generate apples if there are no apples
// make sure apple doesn't spawn where snake already is
function generateApples() {
    let again = true;

    while(again){
        const newApple =  getApple();

        if ( snake.includes(newApple) ){
            continue;
        } else {
            again = false;
            apples = [newApple]
        }
    }
    return apples
}

function moveSnake () {
    const head = snake[0]
    const tail = snake[snake.length-1]

    const headVH = head.replace('xy_', '').split('-');
    const newV = Number(headVH[0]) + snakeDirection.v;
    const newH = Number(headVH[1]) + snakeDirection.h;

    // wrap snake around if moves out of bounds
    const newSnakeV = mod(newV, rows)
    const newSnakeH = mod(newH, columns)

    const newSnakeVH = `xy_${newSnakeV}-${newSnakeH}`;

    // add styling to new snake head
    const newSnakeSquare = document.querySelector(`#${newSnakeVH}`)

    if ( snake.includes(newSnakeSquare.id) ){
        console.log('Snake encountered!')
        // reset styling of existing snake
        snake.forEach( (coordinate) => {
            const square = document.querySelector(`#${coordinate}`);
            styleSquare(square, 'snake-square')
        })
        // reset styling of existing apple
        apples.forEach( (coordinate) => {
            const square = document.querySelector(`#${coordinate}`);
            styleSquare(square, 'apple-square')
        })
        // reset state to defaults
        snake = defaultSnake.slice(0);
        snakeDirection = Object.assign({}, defaultSnakeDirection);
        score = 0;
        delay = defaultDelay;
        // style new snake
        snake.forEach( (coordinate) => {
            const square = document.querySelector(`#${coordinate}`);
            styleSquare(square, 'snake-square')
        })
        // style new apples
        apples.forEach( (coordinate) => {
            const square = document.querySelector(`#${coordinate}`);
            styleSquare(square, 'apple-square')
        })
        return;
    }

    // style new snake head
    styleSquare(newSnakeSquare, 'snake-square')
    // add new snake head to snake array
    snake.unshift(newSnakeVH)

    if( apples.includes(newSnakeSquare.id) ) {
        console.log('Apple encountered!')

        appleBite.play()

        newSnakeSquare.classList.remove('apple-square')
        score++;

        // add new apple
        const apples = generateApples();
        const square = document.querySelector(`#${apples[0]}`);
        styleSquare(square, 'apple-square')

        // increase speed
        delay = Math.max(100, delay - 5);
    } else {
        // remove styling from tail square
        const tailSquare = document.querySelector(`#${tail}`)
        styleSquare(tailSquare, 'snake-square')

        // remove tail from snake array
        snake.pop()
    }
}


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

    if (elapsed > delay) {
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
    // call checks and transitions here
    moveSnake()
    document.querySelector('#score > span').innerHTML = score;
}

gameLoop();