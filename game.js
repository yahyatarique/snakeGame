import { update as updateSnake, draw as drawSnake, getSnakeHead, getSnakeBody, snakeIntersection, SNAKE_SPEED, reset as resetSnake } from './snake.js'
import { update as updateFood, draw as drawFood, getScores, setHighScore, drawHighScore, reset as resetFood} from './food.js'
import { update as updateEnemy, draw as drawEnemy, enemyKilledSnake, drawEnemyNextPath, reset as resetEnemy } from './enemy.js';
import { outsideGrid, getGridSize } from './grid.js';
import { getGameUI, getDifficulty } from './game-ui.js';

let lastRenderTime = 0;
let gameOver = false;
let gamePaused = true;

const gameBoard = document.getElementById('game-board');
const scoreBoard = document.getElementById('score');
const levelBoard = document.getElementById('level');
const gameUI = document.getElementById('game-ui');

gameBoard.style.setProperty("--grid-size", getGridSize());


function main(currentTime) {
    if (gameOver || gamePaused) {
        setHighScore();
        getGameUI(gameOver);
    }

    
    if (!gamePaused && !gameOver) {
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
    // drawEnemyNextPath(gameBoard);    // For debugging
    drawEnemy(gameBoard);
    drawFood(gameBoard);
    drawSnake(gameBoard);
}

function checkDeath() {
    let userDifficulty = getDifficulty();
    if (userDifficulty == 'hard') {
        gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() || enemyKilledSnake(getSnakeBody());
    } else {
        gameOver = snakeIntersection() || enemyKilledSnake(getSnakeBody());
    }
    if (gameOver) setHighScore();
}

export function restart() {
    resetFood();
    resetEnemy();
    resetSnake();
    gameOver = false;
    gamePaused = false;
    window.requestAnimationFrame(main);
    gameUI.classList.remove('active');
}

export function startGame() {
    if (gameOver) restart();
    else {
        gamePaused = false;
        resetEnemy();
        window.requestAnimationFrame(main);
        gameUI.classList.remove('active');
    }
}

export function checkGameOver() {
    return gameOver;
}

export function setGamePaused(bool) {
    gamePaused = bool;
}