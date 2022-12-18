import { getInputDirection } from "./input.js";
import { getScores, getExpansionRate } from "./food.js";

export let SNAKE_SPEED = 1;
const MAX_SPEED = 5;
const snakeBody = [{x: 11, y: 11}];
let newSegments = 0;

export function update() {
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i-- ) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }
    
    getSnakeSpeed();
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
} 

export function draw(gameBoard) {
    const inputDirection = getInputDirection();
    snakeBody.forEach((segment, index) => {
        const snakeElement = document.createElement('div');
        snakeElement.innerText = `${index + 1}`;
        snakeElement.style.textAlign = "center";
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.zIndex = `${-index + 20 }`;
        snakeElement.classList.add('snake');
        if (index == 0) snakeElement.classList.add('head');
        if (index == 0 && inputDirection.y < 0) snakeElement.classList.add('head-top');
        else if (index == 0 && inputDirection.y > 0) snakeElement.classList.add('head-down');
        else if (index == 0 && inputDirection.x > 0) snakeElement.classList.add('head-right');
        else if (index == 0 && inputDirection.x < 0) snakeElement.classList.add('head-left');
        // else snakeElement.classList.add('head');
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
    if(level > MAX_SPEED) return

    SNAKE_SPEED = level;
}

export function getSnakeBody() {
    return snakeBody;
}