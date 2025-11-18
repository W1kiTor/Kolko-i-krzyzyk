const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const winnerMessage = document.getElementById("winner-message");
const winnerButtons = document.getElementById("winner-buttons");
const turnInfo = document.getElementById("turn-info");
let currentPlayer = "X";
let gameActive = true;
let boardState = Array(9).fill("");

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// Zabezpieczenie — brak cofania do poprzedniej strony
history.pushState(null, null, location.href);
window.onpopstate = function() {
    history.go(1);
};

function handleClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (!gameActive || boardState[index] !== "") return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        endGame(`${currentPlayer} wygrał!`);
    } else if (!boardState.includes("")) {
        endGame("Remis!");
    } else {
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnInfo.textContent = `Tura: ${currentPlayer}`;
    document.body.className = currentPlayer === "X" ? "turn-x" : "turn-o";
}

function checkWinner() {
    return winPatterns.some(pattern => {
        return pattern.every(i => boardState[i] === currentPlayer);
    });
}

function endGame(message) {
    winnerMessage.textContent = message;
    winnerButtons.style.display = "flex";
    gameActive = false;
    turnInfo.style.display = "none";
}

function resetGame() {
    boardState = Array(9).fill("");
    cells.forEach(c => c.textContent = "");
    winnerMessage.textContent = "";
    winnerButtons.style.display = "none";
    turnInfo.style.display = "block";
    gameActive = true;
    currentPlayer = "X";
    document.body.className = "turn-x";
    turnInfo.textContent = "Tura: X";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
