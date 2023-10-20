let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];


function mark(player, row, col) {
    if (!isCellOccupied(row, col)) {
        board[row - 1][col - 1] = player;
    } else {
        console.log(`Cannot mark: cell ${row}:${col} is occupied`);
    }
}

function clear() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            board[row][col] = '';
        }
    }
}



function isCellOccupied(row, col) {
    if (board[row - 1][col - 1] !== '') {
        return true;
    } else {
        return false;
    }
}

export {
    mark,
    clear,
}