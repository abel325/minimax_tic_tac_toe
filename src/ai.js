import * as GameBoard from './gameboard.js'

function findBestMove(board) {
    let bestMove = { row: -1, col: -1 };
    let bestScore = -Infinity;
  
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === '') {
          board[row][col] = 'O';
          const score = minimax(board, 0, false);
          board[row][col] = '';
  
          if (score > bestScore) {
            bestScore = score;
            bestMove = {
                 row: row + 1,
                 col: col + 1
            };
          }
        }
      }
    }
  
    return bestMove;
}
  
function minimax(board, depth, isMaximizing) {
    const scores = {
      X: -1, // Human player
      O: 1,  // Computer player
      T: 0,  // Tie
    };
  
    const result = checkWinner(board);
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === '') {
            board[row][col] = 'O';
            const score = minimax(board, depth + 1, false);
            board[row][col] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === '') {
            board[row][col] = 'X';
            const score = minimax(board, depth + 1, true);
            board[row][col] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
}
  
Math.random()


function checkWinner(board) {
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
  

function makeMove() {
    let board = GameBoard.getBoardCopy();
    let bestMove = findBestMove(board);
    GameBoard.mark('O', bestMove.row, bestMove.col);
    return {row: bestMove.row, col: bestMove.col};
}

export {
    makeMove,
}