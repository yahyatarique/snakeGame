import { getScores } from "./food.js";
import { startGame, restart, checkGameOver } from "./game.js";

// Defining elements to control the game;
const gameUI = document.getElementById('game-ui');
const highScoreUI = document.getElementById('highscore-ui');
const currentScoreUI = document.getElementById('current-score-ui');
const form = document.getElementById('form');
const errorEl = document.getElementById('error');
const playButton = document.getElementById('start-button');
const welcomeElem = document.getElementById('welcome');


let userName;
let userEmail;
let userDifficulty;

export function getGameUI(gameOver) {
    if (gameOver) {
        gameUI.style.setProperty('--redness', 55);

        errorEl.innerHTML = 
        `<div class="game-over-text">
            GAME OVER
        </div>
        <p>${userName} died.</p>`;
        errorEl.style.display = 'block';
        welcomeElem.style.display = 'none';
        playButton.innerText = 'Replay?';
    } else {
        gameUI.style.setProperty('--redness', 0);
    }
    highScoreUI.innerText = getScores().highScore;
    currentScoreUI.innerText = getScores().score;
    gameUI.classList.add('active');

}

function extractValuesFromForm() {
    userName = document.getElementById('name').value;
    userEmail = document.getElementById('email').value;
    if (document.querySelector('input[name="difficulty"]:checked')) userDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
    
    if(!userName || userName.length == 0) {
        errorEl.style.display = 'block';
        errorEl.innerText = 'Please enter a name!';
    } else if (!userEmail) {
        errorEl.style.display = 'block';
        errorEl.innerText = 'Email cannot be empty!';
    } else if (!userDifficulty || userDifficulty == undefined) {
        errorEl.style.display = 'block';
        errorEl.innerText = 'Choose a difficulty level!';
    } else {
        startGame();
        saveUser(userName, userEmail, userDifficulty);
        getUser();
        gameUI.classList.remove('active');
    }

}

function saveUser() {
    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userDifficulty', userDifficulty);
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!userName || !userEmail || !userDifficulty) extractValuesFromForm();
    if (checkGameOver() || getUser()) startGame();
})

form.addEventListener('reset', (e) => {
    localStorage.clear();
    location.reload();
})

export function getUser() {
    if (localStorage.userName != undefined && localStorage.userName.length !== 0) {
        userName = localStorage.getItem('userName');
        document.querySelector('.name-input').style.display = 'none';

        userEmail = localStorage.getItem('userEmail');
        document.querySelector('.email-input').style.display = 'none';

        userDifficulty = localStorage.getItem('userDifficulty');
        document.querySelector('.difficulty-selector').style.display = 'none';

        welcomeElem.style.display = 'block';
        welcomeElem.innerHTML = 
        `<div className="hi">
        Hi!
        </div>
        <br>
        <span>${userName}</span><br>
        <div class="back">Welcome Back!<div>`;
    } else {
        return false;
    }

    return true;
}
