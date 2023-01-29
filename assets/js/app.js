const grid = document.getElementById('grid');
const timer = document.getElementById('timer');
const result = document.getElementById('result');
const startStop = document.getElementById('start-stop');
const rows = 9; // Needs to be an odd number
const columns = rows;

let squares,
    leftItems,
    rightItems,
    currentIndex = 76,
    typeId = 1;

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
            } else if ((i > 1 && i < 4) || (i > 4 && i < 7)) {
                if (i % 2 !== 0) {
                    square.dataset.typeObstacle = 'right';
                    square.dataset.typeId = typeId;
                    typeId++;
                } else {
                    square.dataset.typeObstacle = 'left';
                    square.dataset.typeId = typeId;
                    typeId++;
                }
                if (typeId > 5) typeId = 1;
            }
            grid.append(square);
        }
    }
    squares = document.querySelectorAll('.square');
    leftItems = document.querySelectorAll(`[data-type-obstacle='left']`);
    rightItems = document.querySelectorAll(`[data-type-obstacle='right']`);
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

document.addEventListener('keyup', moveFrog);

function autoMoveLogs() {
    [...leftItems].map(item => moveLogLeft(item));
    [...rightItems].map(item => moveLogRight(item));
}

function moveLogLeft(item) {
    let itemTypeId = parseInt(item.dataset.typeId);
    ++itemTypeId;
    if (itemTypeId > 5) itemTypeId = 1;

    switch (true) {
        case typeof itemTypeId === 'number':
            item.dataset.typeId = itemTypeId;
            break;
    }
}

function moveLogRight(item) {
    let itemTypeId = parseInt(item.dataset.typeId);
    --itemTypeId;
    if (itemTypeId < 1) itemTypeId = 5;

    switch (true) {
        case typeof itemTypeId === 'number':
            item.dataset.typeId = itemTypeId;
            break;
    }
}

setInterval(autoMoveLogs, 1000);
