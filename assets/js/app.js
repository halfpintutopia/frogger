const grid = document.getElementById('grid');
const timer = document.getElementById('timer');
const result = document.getElementById('result');
const startStop = document.getElementById('start-stop');
const sqaures = document.querySelectorAll('square');
const rows = 9;
const columns = 9;

function createGameBoard() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const square = document.createElement('div');
            if (i === 0) {
                square.classList.add('square');
                if (j === 4) {
                    square.classList.add('square', 'end')
                }
            } else if (i === rows - 1) {
                square.classList.add('square');
                if (j === 4) {
                    square.classList.add('square', 'start')
                }
            } else if (i === 4) {
                square.classList.add('square');
            } else if (i === 1 || i === 7) {
                square.classList.add('square');
            } else if ((i > 1 && i < 4) || (i > 4 && i < 7)) {
                if (i % 2 !== 0) {
                    square.classList.add('square', 'left');
                } else {
                    square.classList.add('square', 'right');
                }
            }
            grid.append(square);
        }
    }
}

createGameBoard();

function moveFrog() {
    console.log('moved');
}

document.addEventListener('keyup', moveFrog);