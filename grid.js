const GRID_SIZE = 21;
const body = document.body;

export function randomGridPos() {
    return {
        x : Math.ceil(Math.random() * GRID_SIZE),
        y : Math.ceil(Math.random() * GRID_SIZE)
    }
}

export function outsideGrid(position) {
    return (
        position.x < 1 || position.x > GRID_SIZE || position.y < 1 || position.y > GRID_SIZE
    )
}

export function hueChange(hue) {
    body.style.setProperty('--hue', hue);
}

export function getGridSize() {
    return GRID_SIZE;
}

