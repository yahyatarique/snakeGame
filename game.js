import { update as updateSnake, draw as drawSnake, getSnakeHead, getSnakeBody, snakeIntersection, SNAKE_SPEED } from './snake.js'
import { update as updateFood, draw as drawFood, getScores, setHighScore, drawHighScore} from './food.js'
import { update as updateEnemy, draw as drawEnemy, enemyKilledSnake, drawEnemyNextPath } from './enemy.js';
import { outsideGrid, getGridSize } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
let gamePaused = true;

const gameBoard = document.getElementById('game-board');
const scoreBoard = document.getElementById('score');
const levelBoard = document.getElementById('level');
const startButton = document.getElementById('start-button');

gameBoard.style.setProperty("--grid-size", getGridSize());

function main(currentTime) {
    if (gameOver) {
        if(confirm('You Loser! Restart?')) return location.reload()
    }

    
    if (!gamePaused) {
        window.requestAnimationFrame(main);
        const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
        if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
    
    
        lastRenderTime = currentTime;
        update();
        if (!gameOver) draw();
    }
}


window.requestAnimationFrame(main);

function update() {
    checkDeath();
    updateSnake();
    updateFood();
    updateEnemy();
}

function draw() {
    // Emptying gameBoard
    gameBoard.innerHTML = '';
    
    // Setting Score with getScores()
    scoreBoard.innerText = getScores().score;
    levelBoard.innerText = `Level ${getScores().level}`;
    
    // Drawing elements
    drawHighScore(gameBoard);
    drawEnemyNextPath(gameBoard);
    drawEnemy(gameBoard);
    drawFood(gameBoard);
    drawSnake(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || enemyKilledSnake(getSnakeBody());
    if (gameOver) setHighScore();
}

export function pauseGame() {
    if(!gamePaused) {
        gamePaused = true;
        startButton.innerText = 'Start Game'
    } else {
        gamePaused = false;
        window.requestAnimationFrame(main);
        startButton.innerText = 'Pause Game'
    }
    startButton.classList.toggle('started');
}

export function startGame() {
    if(gamePaused) {
        gamePaused = false;
        window.requestAnimationFrame(main);
        startButton.innerText = 'Pause Game'
    } else {
        gamePaused = true;
        startButton.innerText = 'Start Game'
    }
    startButton.classList.toggle('started');
}

startButton.addEventListener('click', (e) => {
    startGame();
});