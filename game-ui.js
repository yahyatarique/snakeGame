import { getScores } from "./food.js";
import { startGame, restart } from "./game.js";

// Defining elements to control the game;
const gameUI = document.getElementById('game-ui');
const highScoreUI = document.getElementById('highscore-ui');
const currentScoreUI = document.getElementById('current-score-ui');
const form = document.getElementById('form');
const errorEl = document.getElementById('error');
const playButton = document.getElementById('start-button');

let userName;
let userEmail;
let userDifficulty;

export function getGameUI(gameOver) {
    if (gameOver) {
        gameUI.style.setProperty('--redness', 55);

        errorEl.innerText = `GAME OVER, ${getUser().userName}`;
        playButton.innerText = 'Replay?';
    }
    highScoreUI.innerText = getScores().highScore;
    currentScoreUI.innerText = getScores().score;
    console.log(getScores().score);
    gameUI.classList.add('active');

}

function extractValuesFromForm() {
    userName = document.getElementById('name').value;
    userEmail = document.getElementById('email').value;
    userDifficulty = document.querySelectorAll('input[name="difficulty"]:checked').value;
    
    if(!userName) {
        errorEl.innerText = 'Please enter a name!';
    } else if (!userEmail) {
        errorEl.innerText = 'Email cannot be empty!';
    } else if (!userDifficulty || userDifficulty == undefined) {
        errorEl.innerText = 'Choose a difficulty level!';
    } else {
        startGame();
        gameUI.classList.remove('active');
    }

    saveUser(userName, userEmail, userDifficulty);
}

function saveUser() {
    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userDifficulty', userDifficulty);
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!userName || !userEmail || !userDifficulty) extractValuesFromForm();
    startGame();
    gameUI.classList.toggle('active');
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

        let welcomeElem = document.getElementById('welcome');
        welcomeElem.style.display = 'block';
        welcomeElem.innerHTML = 
        `<div className="hi">
        Hi!
        </div>
        <br>
        <span>${userName}</span><br>
        <div class="back">Welcome Back!<div>`;
    } else {
        gameUI.classList.add('active');
        return false;
    }

    return {userName, userEmail, userDifficulty}
}
