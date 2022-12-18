import { update as updateSnake, draw as drawSnake, getSnakeHead, getSnakeBody, snakeIntersection, SNAKE_SPEED } from './snake.js'
import { update as updateFood, draw as drawFood, getScores, getHighScore, drawHighScore } from './food.js'
import { update as updateEnemy, draw as drawEnemy, enemyKilledSnake, drawEnemyNextPath } from './enemy.js';
import { outsideGrid, getGridSize } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
let gamePaused = false;
const gameBoard = document.getElementById('game-board');
gameBoard.style.setProperty("--grid-size", getGridSize());
const scoreBoard = document.getElementById('score');
const levelBoard = document.getElementById('level');

function main(currentTime) {
    if (gameOver) {
        if(confirm('You Taaha! Restart?')) return location.reload()
    }

    
    if (!gamePaused) {
        window.requestAnimationFrame(main);
        const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
        if (secondsSinceLastRender < 1 /(5*SNAKE_SPEED)) return
    
    
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
    // drawHighScore(gameBoard);
    drawEnemyNextPath(gameBoard);
    drawEnemy(gameBoard);
    drawFood(gameBoard);
    drawSnake(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || enemyKilledSnake(getSnakeBody());
    if(gameOver && enemyKilledSnake(getSnakeBody())) {
        console.log(`enemyKilledSnake: ${true}`);
    }
    getHighScore();
}

export function pauseGame() {
    if(!gamePaused) {
        gamePaused = true;
        console.log(`gamePaused: ${gamePaused}`)
    } else {
        gamePaused = false;
        window.requestAnimationFrame(main);
        console.log(`gamePaused: ${gamePaused}`)
    }
}