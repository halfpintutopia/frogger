const grid = document.getElementById('grid');
const timer = document.getElementById('timer');
const result = document.getElementById('result');
const startStop = document.getElementById('start-stop');
const rows = 9;
const columns = 9;
let squares,
    currentIndex = 76;

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
    squares = document.querySelectorAll('.square');
}

// function createBoard() {
//     for (let i = 0; i < rows; i++) {
//         for (let j = 0; j < columns; j++) {
//
//             grid.append(square);
//         }
//     }
//     squares = document.querySelectorAll('.square');
// }

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