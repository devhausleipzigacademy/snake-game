export function mod(n, m) {
    return ((n % m) + m) % m;
}

export function randomNumber(range) {
    return Math.floor(Math.random() * range);
}

export function randomCoordinate(xRange, yRange) {
    return [randomNumber(xRange), randomNumber(yRange)];
}

export function styleSquare(element, styleClass) {
    element.classList.toggle(styleClass);
}
