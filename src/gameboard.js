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

function getBoardState() {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
        return board[i][0];
      }
    }
  
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
        return board[0][i];
      }
    }
  
    // Check diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
      return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
      return board[0][2];
    }
  
    // Check for a tie
    let isTie = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          isTie = false;
          break;
        }
      }
    }
    if (isTie) {
      return 'T';
    }
  
    return null;
}

function getBoardCopy() {
    return board.map(row => [...row]);
}

function logBoard() {
    console.log(board);
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
    isCellOccupied,
    getBoardCopy,
    logBoard,
    getBoardState,
}
