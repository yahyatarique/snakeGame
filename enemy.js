import { equalPositions } from './snake.js';
import { getGridSize } from './grid.js';
import { getDifficulty } from './game-ui.js';

// Array, because different difficulty level will have different number of enemies
const maxNumberOfEnemies = [1, 3, 4];

// Defining how many steps to take before newRandomDirection
const STEPS_BEFORE_NEW_DIRECTION = 5;

// Intializing empty arrays for enemies
let enemies = [];
let directionVectors = [];
let enemySteps = [];

function createEnemies(numberOfEnemies) {
    // Function to create Enemies based on the number of Enemies provided, changes according the difficulty level
    for(let i = 0; i < numberOfEnemies; i++) {
        // Creating objects for Enemies
        let enemy = {
            x: Math.ceil(Math.random() * getGridSize()),
            y: Math.ceil(Math.random() * getGridSize())
        }

        // Pushing enemy object to the enemies array
        enemies.push(enemy);

        // Create new directionVector object, with no direction.
        let directionVector = {
            x: 0, y: 0
        }

        // Pushing the new directionVector object to the relavant array
        directionVectors.push(directionVector);

        // Creating a new entry of enemyStep for the enemy.
        enemySteps.push(Math.floor(Math.random() * STEPS_BEFORE_NEW_DIRECTION));
    }
}

// TEMP: Calling fn. to create Enemies
let userDifficulty = getDifficulty();
if (userDifficulty == 'hard') {
    createEnemies(maxNumberOfEnemies[2]);
} else if (userDifficulty == 'medium') {
    createEnemies(maxNumberOfEnemies[1]);
} else {
    createEnemies(maxNumberOfEnemies[0]);
}


export function update() {
    // Function to update Enemy position and direction, if neeeded.
    
    enemies.forEach((enemy, i) => {
        // Checking if the given enemy requires new direction, if so, give it one.
    if ( enemySteps[i] % STEPS_BEFORE_NEW_DIRECTION == 0 ) {
            directionVectors[i].x = randomDirection();
            if ( directionVectors[i].x === 0 ) {
                directionVectors[i].y = randomDirection({withoutZero : true});
            } else directionVectors[i].y = 0;
            // Re-initializing Enemy steps with new Direction
            enemySteps[i] = 0;
    }
    
        // If enemy isn't outsideGrid, it takes a step
        if(!enemyOutsideGrid(enemy)) {
            enemy.x += directionVectors[i].x;
            enemy.y += directionVectors[i].y;
        }
        
        // Checking if enemy is at the edge, then pull back.
        if (enemy.x <= 1) enemy.x += 1;
        if (enemy.y <= 1) enemy.y += 1;
        if (enemy.x >= getGridSize()) enemy.x -= 1;
        if (enemy.y >= getGridSize()) enemy.y -= 1;

        // Adding a step, when enemy has taken a step.
        enemySteps[i] += 1;
    })
}

export function draw(gameBoard) {
    // Draws updated enemy on gameBoard
    enemies.forEach((enemy, i) => {
        const enemyElement = document.createElement('div');

        // Positioning Enemy on the grid
        enemyElement.style.gridRowStart = enemy.y;
        enemyElement.style.gridColumnStart = enemy.x;
        
        // Adding class for styling
        enemyElement.classList.add('enemy');
        
        // Appending to the gameBoard
        gameBoard.appendChild(enemyElement);
    })
}

function randomDirection({withoutZero = false} = {}) {
    // Function to return a random Direction vector for individual axis

    // Taking a random number between 1 & 3 to use in switch case.
    var randomNumber = Math.ceil(Math.random() * 3);

    // Checking if withoutZero is true, and taking random b/w 1 & 2
    if (randomNumber === 3 && withoutZero === true) randomNumber = Math.ceil(Math.random() * 2);

    // Switch case to return diff values based on randomNumber
    switch(randomNumber) {
        case 1:
            return -1;
        case 2:
            return 1;
        case 3:
            return 0;
    }
}

function enemyOutsideGrid(position) {
    // Function to check if the enemy is outside the grid
    return position.x >= getGridSize() || position.x <= 1 || position.y >= getGridSize() || position.y <= 1
}

export function enemyKilledSnake(snakeBody) {
    // Function to check if the Enemy killed Snake
    let finalTest = [];

    enemies.forEach((enemy) => {
        // For every enemy, arrPerEnemy stores if it collides with any of the snakeBodyPart
        let arrPerEnemy = [];
        snakeBody.forEach((snakeBodyPart) => {
            if (equalPositions(snakeBodyPart, enemy)) {
                //Pushing 'true' if the snakeBodyPart collides with enemy, otherwise 'false'
                arrPerEnemy.push(true)
            } else arrPerEnemy.push(false)
        })
        // Now, if any of the snakeBodyPart collided with Enemy, adding 'true' to arrPerEnemy
        if (arrPerEnemy.includes(true)) finalTest.push(true);
        else finalTest.push(false);
    })

    // Checking if any of the enemy collided with snakeBody with 'true' check inside finalTest.
    return finalTest.includes(true);
}

export function drawEnemyNextPath(gameBoard) {
    // Drawing Enemy path for every enemy
    enemies.forEach((enemy, index) => {
        // Drawing path for only the steps left in the enemySteps in the same direction
        for(let i = 0; i < 5 - enemySteps[index]; i++) {
            // Create an HTML elem for every path
            const enemyNextPathElem = document.createElement('div');
            enemyNextPathElem.classList.add('enemy-path');
            
            // Positioning the path with respect to directionVectors
            if (directionVectors[index].x != 0) {
                if (directionVectors[index].x > 0) {
                    if(enemy.x + directionVectors[index].x + i < getGridSize()) enemyNextPathElem.style.gridColumnStart = enemy.x + directionVectors[index].x + i;
                    else break;
                } else {
                    if(enemy.x + directionVectors[index].x - i > 0) enemyNextPathElem.style.gridColumnStart = enemy.x + directionVectors[index].x - i;
                    else break;
                }
                enemyNextPathElem.style.gridRowStart = enemy.y + directionVectors[index].y;
            } else if (directionVectors[index].y != 0) {
                if (directionVectors[index].y > 0) {
                    if(enemy.y + directionVectors[index].y + i < getGridSize()) enemyNextPathElem.style.gridRowStart = enemy.y + directionVectors[index].y + i;
                    else break;
                } else {
                    if(enemy.y + directionVectors[index].y - i > 0) enemyNextPathElem.style.gridRowStart = enemy.y + directionVectors[index].y - i;
                    else break;
                }
                enemyNextPathElem.style.gridColumnStart = enemy.x + directionVectors[index].x;
            }
            // Appending Enemy path elements to the gameBoard
            gameBoard.appendChild(enemyNextPathElem);
        }
    })
}

export function reset() {
    enemies = [];
    directionVectors = [];
    enemySteps = [];
    createEnemies(maxNumberOfEnemies[0]);
    if (userDifficulty == 'hard') {
        createEnemies(maxNumberOfEnemies[2]);
    } else if (userDifficulty == 'medium') {
        createEnemies(maxNumberOfEnemies[1]);
    } else {
        createEnemies(maxNumberOfEnemies[0]);
    }    
}