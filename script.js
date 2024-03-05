const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const message = document.getElementById('message');
const ai = document.getElementById('1');
const human = document.getElementById('2');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

let turn = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
ai.addEventListener("click",()=>{
    turn = false;
    board.style.display="grid";
    restartButton.classList.remove("hide");
    ai.style.display = "none";
    human.style.display = "none";
});
human.addEventListener("click", () => {
    turn = true;
    board.style.display="grid";
    restartButton.classList.remove("hide");
    ai.style.display = "none";
    human.style.display = "none";
});
const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell'));

    if (gameState[cellIndex] !== '' || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;

    if (checkWin() || checkDraw()) {
        gameActive = false;
        endGame();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (!checkDraw() && !turn) {
        if (currentPlayer === 'O') {
            setTimeout(() => {
                makeAiMove();
            }, 500);
        }
    }
};

const makeAiMove = () => {
    const emptyCells = gameState.reduce((acc, curr, index) => {
        if (curr === '') acc.push(index);
        return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cellIndex = emptyCells[randomIndex];

    gameState[cellIndex] = currentPlayer;
    const cell = document.querySelector(`[data-cell='${cellIndex}']`);
    cell.innerText = currentPlayer;

    if (checkWin() || checkDraw()) {
        gameActive = false;
        endGame();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWin = () => {
    return winningConditions.some((condition) => {
        return condition.every((index) => {
            return gameState[index] === currentPlayer;
        });
    });
};

const checkDraw = () => {
    return !gameState.includes('');
};

const endGame = () => {
    if (checkWin()) {
        message.innerText = `Player ${currentPlayer} wins!`;
    } else if (checkDraw()) {
        message.innerText = 'Draw!';
    }
};

const restartGame = () => {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    message.innerText = '';
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');

    if (currentPlayer === 'O') {
        setTimeout(() => {
            makeAiMove();
        }, 500);
    }
    board.style.display = "none";
    restartButton.classList.add("hide");
    ai.style.display = "inline-block";
    human.style.display = "inline-block";
};

board.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', restartGame);
