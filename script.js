let currentPlayer = "X";
let gameGrid = [];
const winPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const getEle = (eleTag) => document.querySelector(`${eleTag}`);
const getEleAll = (eleTag) => document.querySelectorAll(`${eleTag}`);
const playerTurn = getEle(".player-btn");
const newGameBtn = getEle(".new-game-btn");
const boxes = getEleAll(".box");
initGame();

function initGame() {
    currentPlayer = "X";
    playerTurn.innerText = `Current Player - ${currentPlayer}`;
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    newGameBtn.classList.remove("on");
    playerTurn.classList.remove("done");
    boxes.forEach((box) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove("win");
    });
}

boxes.forEach((box, ind) => {
    box.addEventListener("click", () => handleClick(box, ind));
});

function handleClick(box, ind) {
    if (box.innerText === "") {
        box.innerText = currentPlayer;
        gameGrid[ind] = currentPlayer;
        box.style.pointerEvents = "none";
        if (checkGameOver()) return;
        // swap turn
        currentPlayer = currentPlayer == "X" ? "O" : "X";
        playerTurn.innerText = `Current Player - ${currentPlayer}`;
    }
}

function checkGameOver() {
    let winnerFound = false;
    winPositions.forEach((pos) => {
        let winner = gameGrid[pos[0]];
        let cnt = 1 + (gameGrid[pos[1]] === winner) + (gameGrid[pos[2]] === winner);

        if (winner !== "" && cnt === 3) {
            // winner found
            winnerFound = true;
            playerTurn.innerText = `Winner Player - ${winner}`;

            // apply green color
            pos.forEach((ind) => boxes[ind].classList.add("win"));
            newGameBtn.classList.add("on");
            playerTurn.classList.add("done");

            // disable pointer events
            boxes.forEach((box) => (box.style.pointerEvents = "none"));
        }
    });

    if (winnerFound == true) return true;
    else {
        let fillCount = 0;
        gameGrid.forEach((x) => (fillCount += x !== ""));

        // board is filled
        if (fillCount === 9) {
            playerTurn.innerText = "Oops! Game Tied !";
            newGameBtn.classList.add("on");
            playerTurn.classList.add("done");
            return true;
        }
    }
    return false;
}

newGameBtn.addEventListener("click", initGame);
