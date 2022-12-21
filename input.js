const gameBoard = document.getElementById('game-board');

// Intializing inputDirection with 'Right' direction
let inputDirection = { x: 1, y: 0 };
let lastInputDirection = { x: 0, y: 0 }

// Intializing empty swipes to register touch input
let swipeStart, swipeEnd;

window.addEventListener('keydown', (e) => {
    // Handling Keyboard input
    switch (e.key) {
        case 'ArrowUp':
        case 'W':
        case 'w':
            if ( lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: -1 }
            break
        case 'ArrowDown':
        case 'S':
        case 's':
            if ( lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: 1 }
            break
        case 'ArrowLeft':
        case 'A':
        case 'a':
            if ( lastInputDirection.x !== 0) break
            inputDirection = { x: -1, y: 0 }
            break
        case 'ArrowRight':
        case 'D':
        case 'd':
            if ( lastInputDirection.x !== 0) break
            inputDirection = { x: 1, y: 0 }
            break
    }
 })

export function getInputDirection() {
    // Function to get Input Direction so that snakeHead is pointing towards the direction
    lastInputDirection = inputDirection;
    return inputDirection;
}

function handleSwipeEvents(swipeStart, swipeEnd) {
    let diffX, diffY;

    // Calculating difference in position to determine swipes
    diffX = Math.abs(swipeStart.x - swipeEnd.x);
    diffY = Math.abs(swipeStart.y - swipeEnd.y);
    
    if (diffX > diffY) {
        // Left or Right
        if (swipeStart.x > swipeEnd.x && lastInputDirection.x == 0) {
            // Left Swipe
            inputDirection = { x: -1, y: 0 }
        } else if (lastInputDirection.x == 0) {
            // Right Swipe
            inputDirection = { x: 1, y: 0 }
        }
    } else {
        // Up or Down
        if (swipeStart.y > swipeEnd.y && lastInputDirection.y == 0) {
            // Up Swipe
            inputDirection = { x: 0, y: -1 }
        } else if (lastInputDirection.y == 0) {
            // Down Swipe
            inputDirection = { x: 0, y: 1 }
        }
    }
}

export function reset() {
    inputDirection = { x: 1, y: 0 };
    lastInputDirection = { x: 0, y: 0 }

    swipeStart = { x: null, y: null}
    swipeEnd = { x: null, y: null}
}

gameBoard.addEventListener('touchstart', (e) => {
    e.preventDefault();
    // Getting swipeStart
    swipeStart = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    }
})

gameBoard.addEventListener('touchend', (e) => {
    e.preventDefault();
    // Getting swipeEnd
    swipeEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
    }
    // Calling helper fn to determine which swipe is this
    handleSwipeEvents(swipeStart, swipeEnd);
})