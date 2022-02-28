
function randomNumber(range) {
    return Math.round( (Math.random()*range) );
}

function randomCoordinate(xRange, yRange){
    return [randomNumber(xRange), randomNumber(yRange)];
}

function getSquare(coordinate) {
    document.querySelector(`#${coordinate}`);
}

function styleSquare(element, styleClass) {
    element.classList.toggle(styleClass);
}