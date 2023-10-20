import * as GameBoard from './gameboard.js'

const mark = 'X';

function makeMove(row, col) {
    GameBoard.mark(mark, row, col);
}


export {
    makeMove
}
