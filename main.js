
///////////////////////
//// Prepare Board ////
///////////////////////
const snakeGrid = document.querySelector('#snake-grid')
const messages = document.querySelector('#messages')

const rows = 20;
const columns = 20;

for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
        const gridSquare = document.createElement('div');
        gridSquare.id = `xy_${i}-${j}`
        gridSquare.classList.add('grid-square')
        snakeGrid.appendChild(gridSquare)
    }
}

document.querySelector('#xy_2-3').classList.add('snake-square')


document.querySelector('#xy_4-3').classList.add('apple-square')

///////////////////////////////
//// Initialize Game State ////
///////////////////////////////

// array of coordinates specifying snake
// array of coordinates specifying apples


///////////////////////////
//// State Transitions ////
///////////////////////////

// change direction of movement on arrow keys

// generate apples

// move snake in direction
// we need to remove an old snake square from the end of the snake
// if next snake square is out of bounds, wrap around to other side

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

