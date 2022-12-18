import { onSnake, expandSnake } from './snake.js';
import { randomGridPos, hueChange } from './grid.js';

let food = { x: 15, y: 5, imgCode: Math.ceil(Math.random() * 12)};
let score = 0;
// let highScore = 0;
const LEVEL_UP_RATE = 5;
const EXPANSION_RATE = 1;

export function update() {
    if(onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        score += 1;
        food = getRandomFoodPosAndImage();
    }
}

export function draw(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    foodElement.classList.add(`food-image${food.imgCode}`);
    gameBoard.appendChild(foodElement);
}

// localStorage.setItem('highScore', highScore);

export function getScores() {
    let level = Math.floor(score / LEVEL_UP_RATE) + 1;
    hueChange(Math.abs(100 - (level - 1) * 20));
    return {score, level};
}

function getRandomFoodPosAndImage() {
    let newFood;
    while (newFood == null || onSnake(newFood)) {
        newFood = randomGridPos();
    }

    newFood.imgCode = Math.ceil(Math.random() * 12)
    return newFood;
}

export function getExpansionRate() {
    return EXPANSION_RATE;
}

export function getHighScore() {
    let highScore; 
    
    if(localStorage.highScore) {
        highScore = localStorage.getItem('highScore');
    }

    if (highScore < score) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
    // if (score > highScore) highScore = score;
    // if (highScore) highScore = (localStorage.getItem('highScore'));
    // localStorage.setItem('highScore', highScore);
    // console.log(highScore);
    return highScore;
}

export function drawHighScore(gameBoard) {
    const highScoreElem = document.createElement('div');
    highScoreElem.innerText = getHighScore();
    highScoreElem.classList.add('high-score','flex');
    // highScoreElem.style.backgroundColor = 'rgba(100, 100, 100, 0.2)';
    gameBoard.appendChild(highScoreElem);
}