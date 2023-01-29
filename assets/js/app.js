const grid = document.getElementById('grid');
const rows = 9;
const columns = 9;

function createGameBoard() {
    // first row add ending block
    // third row add log-left class
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