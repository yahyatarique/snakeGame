import { getInputDirection, reset as resetInput } from "./input.js";
import { getScores, getExpansionRate } from "./food.js";
import { getDifficulty } from "./game-ui.js";
import { getGridSize, outsideGrid } from "./grid.js";
import { checkGameOver } from "./game.js";

export let SNAKE_SPEED = 1;
const MAX_SPEED = 8;
let snakeBody = [{x: 11, y: 11}, {x: 12, y: 11}];
let newSegments = 0;

export function update() {
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i-- ) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }
    
    getSnakeSpeed();
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;

    let userDifficulty = getDifficulty();
    if (userDifficulty !== 'hard' && outsideGrid(snakeBody[0]) && !checkGameOver()) {
        if ( snakeBody[0].x > getGridSize() ) snakeBody[0].x = 1;
        else if ( snakeBody[0].x < 1 ) snakeBody[0].x = getGridSize();
        else if ( snakeBody[0].y > getGridSize() ) snakeBody[0].y = 1;
        else if ( snakeBody[0].y < 1 ) snakeBody[0].y = getGridSize();
    }
} 

export function draw(gameBoard) {
    const inputDirection = getInputDirection();
    snakeBody.forEach((segment, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.zIndex = `${-index + snakeBody.length }`;
        snakeElement.classList.add('snake');
        if (index == 0) snakeElement.classList.add('head');
        if (index == snakeBody.length - 1) snakeElement.classList.add('tail');
        if (index == 0 && inputDirection.y < 0) snakeElement.classList.add('head-top');
        else if (index == 0 && inputDirection.y > 0) snakeElement.classList.add('head-down');
        else if (index == 0 && inputDirection.x > 0) snakeElement.classList.add('head-right');
        else if (index == 0 && inputDirection.x < 0) snakeElement.classList.add('head-left');
        gameBoard.appendChild(snakeElement);        
    })
}

export function expandSnake(amount) {
    newSegments = amount;
    addSegments();
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && (index >= 0 && index <= getExpansionRate())) {return false}

        return equalPositions(segment, position)
    })
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

export function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1]});
    }
}

function getSnakeSpeed() {
    let level = getScores().level;
    if(SNAKE_SPEED >= MAX_SPEED) return
    else SNAKE_SPEED = level + 2;
}

export function getSnakeBody() {
    return snakeBody;
}

export function reset() {
    snakeBody = [{x: 11, y: 11}, {x: 12, y: 11}];
    newSegments = 0;
    resetInput();
}