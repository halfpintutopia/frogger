const grid = document.getElementById('grid');
const timer = document.getElementById('timer');
const result = document.getElementById('result');
const startStop = document.getElementById('start-stop');
const rows = 9; // Needs to be an odd number
const columns = rows;

let squares,
    leftLogs,
    rightLogs,
    leftCars,
    rightCars,
    startSquare,
    stopSquare,
    currentIndex = 76,
    typeId = 1,
    timerId,
    checkGamePlayTimerId,
    currentTime = 20;

function createGameBoard() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            if (i === 0) {
                if (j === 4) {
                    square.dataset.game = 'end';
                }
            } else if (i === rows - 1) {
                if (j === 4) {
                    square.dataset.game = 'start';
                }
            } else if (i > 1 && i < 4) {
                if (typeId > 5) typeId = 1;
                if (i % 2 !== 0) {
                    square.dataset.typeObstacle = 'right';
                    square.dataset.typeId = typeId;
                    square.dataset.type = 'log';
                    typeId++;
                } else {
                    square.dataset.typeObstacle = 'left';
                    square.dataset.typeId = typeId;
                    square.dataset.type = 'log';
                    typeId++;
                }

            } else if (i > 4 && i < 7) {
                if (typeId > 3) typeId = 1;
                if (i % 2 !== 0) {
                    square.dataset.typeObstacle = 'right';
                    square.dataset.typeId = typeId;
                    square.dataset.type = 'car';
                    typeId++;
                } else {
                    square.dataset.typeObstacle = 'left';
                    square.dataset.typeId = typeId;
                    square.dataset.type = 'car';

                    typeId++;
                }

            }
            grid.append(square);
        }
    }
    squares = document.querySelectorAll('.square');
    leftLogs = document.querySelectorAll(`[data-type='log'][data-type-obstacle='left']`);
    rightLogs = document.querySelectorAll(`[data-type='log'][data-type-obstacle='right']`);
    leftCars = document.querySelectorAll(`[data-type='car'][data-type-obstacle='left']`);
    rightCars = document.querySelectorAll(`[data-type='car'][data-type-obstacle='right']`);
    startSquare = document.querySelector('[data-game="start"]');
    endSquare = document.querySelector('[data-game="end"]');
}

createGameBoard();

function moveFrog(e) {
    squares[currentIndex].classList.remove('frog')

    switch (e.key) {
        case 'w':
        case 'W':
            currentIndex < columns ? currentIndex : currentIndex -= columns;
            break;
        case 's':
        case 'S':
            currentIndex > (columns * (rows - 1)) ? currentIndex : currentIndex += columns;
            break;
        case 'a':
        case 'A':
            currentIndex % columns === 0 ? currentIndex : currentIndex--;
            break;
        case 'd':
        case 'D':
            currentIndex % columns === columns - 1 ? currentIndex : currentIndex++;
            break;
    }
    squares[currentIndex].classList.add('frog')
}

function autoMoveItems() {
    currentTime--;
    timer.innerHTML = currentTime;
    [...leftLogs].map(item => moveLeft(item, item.dataset.type));
    [...rightLogs].map(item => moveRight(item, item.dataset.type));
    [...leftCars].map(item => moveLeft(item, item.dataset.type));
    [...rightCars].map(item => moveRight(item, item.dataset.type));
}

function moveLeft(item, type) {
    let itemTypeId = parseInt(item.dataset.typeId);
    ++itemTypeId;
    if (type === 'log') {
        if (itemTypeId > 5) itemTypeId = 1;

    } else {
        if (itemTypeId > 3) itemTypeId = 1;
    }
    item.dataset.typeId = itemTypeId;
}

function moveRight(item, type) {
    let itemTypeId = parseInt(item.dataset.typeId);
    --itemTypeId;
    if (type === 'log') {
        if (itemTypeId < 1) itemTypeId = 5;

    } else {
        if (itemTypeId < 1) itemTypeId = 3;
    }
    item.dataset.typeId = itemTypeId;
}


function lose() {
    if (
        (squares[currentIndex].dataset.type === 'log' && (squares[currentIndex].dataset.typeId === '4' || squares[currentIndex].dataset.typeId === '5')) ||
        (squares[currentIndex].dataset.type === 'car' && (squares[currentIndex].dataset.typeId === '2' || squares[currentIndex].dataset.typeId === '3')) ||
        currentTime <= 0
    ) {
        result.innerHTML = `Sorry, you lose!`;
        clearInterval(timerId)
        squares[currentIndex].classList.remove('frog');
        document.removeEventListener('keyup', moveFrog);
    }
}

function win() {
    if (squares[currentIndex].dataset.game === 'end') {
        result.innerHTML = `Yay, you win!`;
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog);
    }
}

function checkGamePlayTimer() {
    lose();
    win();
}

function startGame() {
    if (timerId) {
        clearInterval(timerId);
        clearInterval(checkGamePlayTimerId);
        document.removeEventListener('keyup', moveFrog);
        timerId = null;
    } else {
        timerId = setInterval(autoMoveItems, 1000);
        checkGamePlayTimerId = setInterval(checkGamePlayTimer, 50);
        document.addEventListener('keyup', moveFrog);
    }
}

startStop.addEventListener('click', startGame);
