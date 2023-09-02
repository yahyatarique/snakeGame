import { onSnake, expandSnake } from './snake.js';
import { randomGridPos, hueChange } from './grid.js';
import { getGameUI, getUser } from './game-ui.js';

// Intializing food Element with a fixed x and y and random image
let food = { x: 15, y: 5, imgCode: Math.ceil(Math.random() * 12)};

// Intializing score with 0
let score = 0;

// Intializing highScore, and assigning value with event listener 'onload' below
let highScore;

// Defining how much score makes your level up.
const LEVEL_UP_RATE = 5;

// Defining how much eating a food expands your snake.
const EXPANSION_RATE = 1;

export function update() {
    // Function to get new Food once Snake eats the food on screen.
    if(onSnake(food)) {
        // Checking if snake ate the food, then giving Expansion Rate to expand Snake
        expandSnake(EXPANSION_RATE);

        // Adding score for eating the food
        score += 1;

        // Create new Food element, because snake ate the last one.
        food = getRandomFoodPosAndImage();
    }
}

export function draw(gameBoard) {
    // Function to draw Food element to gameBoard
    const foodElement = document.createElement('div');

    // Positioning Food element, with food.x and food.y
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;

    // Adding class for styling
    foodElement.classList.add('food');

    // Adding class for specific image
    foodElement.classList.add(`food-image${food.imgCode}`);

    // Appending foodElem to gameBoard
    gameBoard.appendChild(foodElement);
}

export function getScores() {
    // Function to calculate levels and return scores and level.
    let level = Math.floor(score / LEVEL_UP_RATE) + 1;

    // Calling hueChange to change bkg color and some element styles based on the level.
    hueChange(Math.abs(100 - (level - 1) * 20));

    // Returns an object with score, level, and highScore.
    if (!highScore) {
        return {score, level, highScore: 0}
    } else return {score, level, highScore}

}

function getRandomFoodPosAndImage() {
    // Function to create newFood Element with random food image and position
    let newFood;

    // A while-loop to keep generating randomFoodPos until one comes up that's not onSnake
    while (newFood == null || onSnake(newFood)) {
        newFood = randomGridPos();
    }
    
    // Assigning randomImage to newFood
    newFood.imgCode = Math.ceil(Math.random() * 12)

    // Return newFood with new Position and random Image
    return newFood;
}

export function getExpansionRate() {
    // Returns Expansion Rate
    return EXPANSION_RATE;
}

export function setHighScore() {
    // Function to store highScore to localStorage, after gameOver
    if (highScore <= score) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
}

export function drawHighScore(gameBoard) {
    // Creating High Score container
    const highScoreCont = document.createElement('div');
    highScoreCont.innerText = 'High score';

    // Adding class for styling
    highScoreCont.classList.add('high-score-container');

    // Creating actual highScoreElement
    const highScoreElem = document.createElement('div');
    highScoreElem.innerText = (highScore > score) ? highScore : score;

    // Adding class for styling
    highScoreElem.classList.add('high-score','flex');

    // Appending highScoreElement to highScoreContainer
    highScoreCont.appendChild(highScoreElem);

    // Appending highScoreContainer to gameBoard
    gameBoard.appendChild(highScoreCont);
}

window.addEventListener('load', (e) => {
    // Setting highScore on load
    if (localStorage.highScore) highScore = localStorage.getItem('highScore');
    else highScore = 0;
    getGameUI(false);
    getUser();
})

export function reset() {
    food = { x: 15, y: 5, imgCode: Math.ceil(Math.random() * 12)};
    score = 0;
}