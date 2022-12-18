import {equalPositions} from './snake.js';
import { getGridSize } from './grid.js';

const maxNumberOfEnemies = 0;

let enemies = [];
let directionVectors = [];
let enemySteps = [];

function createEnemies(numberOfEnemies) {
    for(let i = 0; i < numberOfEnemies; i++) {
        let enemy = {
            x: Math.ceil(Math.random() * getGridSize()),
            y: Math.ceil(Math.random() * getGridSize())
        }
        enemies.push(enemy);

        let directionVector = {
            x: 0, y: 0
        }
        directionVectors.push(directionVector);

        let enemyStep = Math.floor(Math.random() * 5);
        enemySteps.push(enemyStep);
    }
    // console.log(enemySteps)
}

createEnemies(maxNumberOfEnemies);

export function update() {
    
    enemies.forEach((enemy, i) => {
    if ( enemySteps[i] / 5 === 1 ) {
            directionVectors[i].x = randomDirection();
            if ( directionVectors[i].x === 0 ) {
                directionVectors[i].y = randomDirection({withoutZero : true});
            } else directionVectors[i].y = 0;
            enemySteps[i] = 0;
    }
    
        if(!enemyOutsideGrid(enemy)) {
            enemy.x += directionVectors[i].x;
            enemy.y += directionVectors[i].y;
        }
        
        if (enemy.x <= 1) enemy.x += 1;
        if (enemy.y <= 1) enemy.y += 1;
        if (enemy.x >= getGridSize()) enemy.x -= 1;
        if (enemy.y >= getGridSize()) enemy.y -= 1;
        enemySteps[i] += 1;
    })
}

export function draw(gameBoard) {
    enemies.forEach((enemy, i) => {
        const enemyElement = document.createElement('div');
        enemyElement.innerText = `${i + 1}`
        enemyElement.style.gridRowStart = enemy.y;
        enemyElement.style.gridColumnStart = enemy.x;
        enemyElement.classList.add('enemy');
        gameBoard.appendChild(enemyElement);
    })
}

function randomDirection({withoutZero = false} = {}) {
    var randomNumber = Math.ceil(Math.random() * 3);
    if (randomNumber === 3 && withoutZero === true) randomNumber = Math.ceil(Math.random() * 2);
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
    return position.x >= getGridSize() || position.x <= 1 || position.y >= getGridSize() || position.y <= 1
}

export function enemyKilledSnake(snakeBody) {
    let testArray = [];
    let finalTest = [];
    enemies.forEach((enemy) => {
        let arrPerEnemy = [];
        snakeBody.forEach((snakeBodyPart) => {
            if (equalPositions(snakeBodyPart, enemy)) {
                arrPerEnemy.push(true)
            } else arrPerEnemy.push(false)
        })
        if (arrPerEnemy.includes(true)) testArray.push(arrPerEnemy);
    })
    // console.log(testArray);
    testArray.forEach((arrPerEnemy) => {
        if(arrPerEnemy.includes(true)) finalTest.push(true)
        else finalTest.push(false);
        // console.log(finalTest)
    })    
    
    return finalTest.includes(true);
}

// Old Code for enemyKilledSnake() 

// enemies.forEach((enemy, index) => {
//     snakeBody.forEach((snakeSegment, i) => {
//         if (equalPositions(snakeSegment, enemy)) {
//             console.log(`equalPositions - {e[${index}], sn[${i}]}: true`)
//             console.log(
//                 `enemy[${index}].[${[enemy.x, enemy.y]}] for snakeBody[${i}].[${[snakeSegment.x, snakeSegment.y]}]`
//             )
//         };
        // return equalPositions(snakeSegment, enemy);
//     })
// })

export function drawEnemyNextPath(gameBoard) {
    enemies.forEach((enemy, index) => {
        for(let i = 0; i <= 5 - enemySteps[index]; i++) {
            const enemyNextPathElem = document.createElement('div');
            enemyNextPathElem.classList.add('enemy-path');

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
            gameBoard.appendChild(enemyNextPathElem);
        }
    })
}