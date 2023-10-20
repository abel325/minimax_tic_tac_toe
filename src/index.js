import * as GameBoard from './gameboard.js'
import * as Human from './human.js'
import * as Ai from './ai.js'
import "./style.css";

(function() {
    const humanMark = 'X';
    const aiMark = 'O';
    let playerTurn = humanMark;

    const squares = document.querySelectorAll('.gameboard-square');

    for (let square of squares) {
        square.addEventListener('click', onSquareClick);
        square.addEventListener('mouseover', onMouseOver);
        square.addEventListener('mouseleave', onMouseLeave);
    }

    function onSquareClick() {
        if (playerTurn === humanMark && !GameBoard.isCellOccupied(this.id[1], this.id[3])) {
            Human.makeMove(this.id[1], this.id[3]);
            markSquare(this, humanMark, this.id[1], this.id[3]);
            this.style.cursor = 'default';

            setTimeout(checkGameStaus, 100);
            
            playerTurn = aiMark;

            setTimeout(makeAiMove, 500);
        }
    }

    function onMouseOver() {
        if (playerTurn === humanMark && !GameBoard.isCellOccupied(this.id[1], this.id[3])) {
            this.textContent = 'X';
            this.style.color = 'rgb(255, 0, 0, 0.5)';
            this.style.cursor = 'pointer';
        }
    }

    function onMouseLeave() {
        if (!GameBoard.isCellOccupied(this.id[1], this.id[3])) {
            this.textContent = '';
            this.style.color = '';
            this.style.cursor = 'default';
        }
    }

    function markSquare(square, mark, row, col) {
        if (mark === humanMark) {
            square.textContent = mark;
            square.style.color = 'red';
        } else if (mark === aiMark) {
            square.textContent = mark;
            square.style.color = 'blue';
        }
    }

    function makeAiMove() {
        if (playerTurn === aiMark) {
            
            const move = Ai.makeMove();
            const square = document.getElementById('b' + String(move.row) + 'x' + String(move.col));
            markSquare(square, aiMark, move.row, move.col);

            setTimeout(checkGameStaus, 100);

            playerTurn = humanMark;
        }
    }

    function checkGameStaus() {
        const status = GameBoard.getBoardState();
        if (status === 'X') {
            alert('You have won!');
            GameBoard.clear();
            clearSquares();
            playerTurn = humanMark;
        } else if (status === 'O') {
            alert('You have lost!');
            GameBoard.clear();
            clearSquares();
            playerTurn = humanMark;
        } else if (status === 'T') {
            alert("It's a draw!");
            GameBoard.clear();
            clearSquares();
            playerTurn = humanMark;
        }
    }

    function clearSquares() {
        for (let square of squares) {
            square.textContent = '';
        }
    }

})();