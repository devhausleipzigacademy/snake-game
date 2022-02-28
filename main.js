const snakeGrid = document.querySelector('#snake-grid')
const messages = document.querySelector('#messages')

const rows = 20;
const columns = 20;

for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
        const gridSquare = document.createElement('div');
        gridSquare.id = `${i}-${j}`
        gridSquare.classList.add('grid-square')
        snakeGrid.appendChild(gridSquare)
    }
}

