import { pauseGame } from './game.js';

let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 }

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
        case 'W':
        case 'w':
            e.preventDefault();
            if ( lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: -1 }
            break
        case 'ArrowDown':
        case 'S':
        case 's':
            e.preventDefault();
            if ( lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: 1 }
            break
        case 'ArrowLeft':
        case 'A':
        case 'a':
            e.preventDefault();
            if ( lastInputDirection.x !== 0) break
            inputDirection = { x: -1, y: 0 }
            break
        case 'ArrowRight':
        case 'D':
        case 'd':
            e.preventDefault();
            if ( lastInputDirection.x !== 0) break
            inputDirection = { x: 1, y: 0 }
            break
        
            // Pause/Play          
            
        case ' ':
            pauseGame();
            break

    }
 })

export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}

function handleSwipeEvents(swipeStart, swipeEnd) {
    let diffX, diffY;
    diffX = Math.abs(swipeStart.x - swipeEnd.x);
    diffY = Math.abs(swipeStart.y - swipeEnd.y);
    
    if (diffX > diffY) {
        // console.log('Left/Right');
        if (swipeStart.x > swipeEnd.x && lastInputDirection.x == 0) {
            inputDirection = { x: -1, y: 0 }
        } else if (lastInputDirection.x == 0) {
            inputDirection = { x: 1, y: 0 }
        }
    } else {
        // console.log('Up/Down');
        if (swipeStart.y > swipeEnd.y && lastInputDirection.y == 0) {
            inputDirection = { x: 0, y: -1 }
        } else if (lastInputDirection.y == 0) {
            inputDirection = { x: 0, y: 1 }
        }
    }
}
let swipeStart, swipeEnd;

window.addEventListener('touchstart', (e) => {
    e.preventDefault();
    swipeStart = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    }
})

window.addEventListener('touchend', (e) => {
    e.preventDefault();
    swipeEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
    }
    handleSwipeEvents(swipeStart, swipeEnd);
})