const gameState = {
  players: ["X", "O"],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  currentPlayer: "X",
  player1: null,
  player2: null,
};

const inputForm = document.querySelector("#input-form");
const player1Display = document.querySelector("#p1name");
const player2Display = document.querySelector("#p2name");
const resetButton = document.querySelector(".reset");
const board = document.querySelector("#board");
const winBanner = document.querySelector("#winBanner");
const playAgain = document.querySelector("#playAgain");

inputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  gameState.player1 = e.target[0].value;
  gameState.player2 = e.target[1].value;
  e.target[0].value = "";
  e.target[1].value = "";
  renderNames();
});

resetButton.addEventListener("click", function (e) {
  gameState.player1 = null;
  gameState.player2 = null;
  renderNames();
});

function renderNames() {
  player1Display.innerText = gameState.player1;
  player2Display.innerText = gameState.player2;
}

playAgain.addEventListener("click", function (e) {
  gameState.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  winBanner.innerText = "";
  renderBoard();
});

board.addEventListener("click", function (e) {
  const index = e.target.id;
  const rowIdx = index[0];
  const colIdx = index[1];
  if (gameState.board[rowIdx][colIdx] === null) {
    gameState.board[rowIdx][colIdx] = gameState.currentPlayer;
    switchPlayer();
  }

  const xWinStr = `X Wins!`;
  const oWinStr = `O Wins!`;
  const drawStr = `Draw!`;

  renderBoard();
  if (checkForXWin() === true) {
    winBanner.innerText = xWinStr;
  } else if (checkForOWin() === true) {
    winBanner.innerText = oWinStr;
  } else if (checkForDraw() === true) {
    winBanner.innerText = drawStr;
  }
});

function checkForDraw() {
  for (let r of gameState.board) {
    if (r.includes(null)) {
      return false;
    }
  }
  return true;
}

function renderBoard() {
  for (let i = 0; i < gameState.board.length; i++) {
    for (let j = 0; j < gameState.board[i].length; j++) {
      const currDiv = document.getElementById(`${i}${j}`);
      currDiv.innerText = gameState.board[i][j];
    }
  }
}

function switchPlayer() {
  if (gameState.currentPlayer === "X") {
    gameState.currentPlayer = "O";
  } else {
    gameState.currentPlayer = "X";
  }
}

function logDiagDown() {
  let arrDiagDown = [];
  for (let k = 0; k < gameState.board.length; k++) {
    let diagDownVal = gameState.board[k][k];
    arrDiagDown.push(diagDownVal);
  }
  return arrDiagDown;
}

function logDiagUp() {
  let arrDiagUp = [];
  for (let l = gameState.board.length - 1; l >= 0; l--) {
    let diagUpVal = gameState.board[l][gameState.board.length - 1 - l];
    arrDiagUp.push(diagUpVal);
  }
  return arrDiagUp;
}

function logCol0() {
  let arrCol0 = [];
  for (m = 0; m < gameState.board.length; m++) {
    let col0Num = gameState.board[m][0];
    arrCol0.push(col0Num);
  }
  return arrCol0;
}

function logCol1() {
  let arrCol1 = [];
  for (n = 0; n < gameState.board.length; n++) {
    let col1Num = gameState.board[n][1];
    arrCol1.push(col1Num);
  }
  return arrCol1;
}

function logCol2() {
  let arrCol2 = [];
  for (o = 0; o < gameState.board.length; o++) {
    let col2Num = gameState.board[o][2];
    arrCol2.push(col2Num);
  }
  return arrCol2;
}

function logRow0() {
  let arrRow0 = gameState.board[0];
  return arrRow0;
}

function logRow1() {
  let arrRow1 = gameState.board[1];
  return arrRow1;
}

function logRow2() {
  let arrRow2 = gameState.board[2];
  return arrRow2;
}

function validateXWin(arr) {
  let xWin = ["X", "X", "X"];
  for (p = 0; p < arr.length; p++) {
    if (arr[p] !== xWin[p]) {
      return false;
    }
  }
  return true;
}

function validateOWin(arr) {
  let oWin = ["O", "O", "O"];
  for (q = 0; q < arr.length; q++) {
    if (arr[q] !== oWin[q]) {
      return false;
    }
  }
  return true;
}

function checkForXWin() {
  if (validateXWin(logDiagDown()) === true) {
    return true;
  }
  if (validateXWin(logDiagUp()) === true) {
    return true;
  }
  if (validateXWin(logCol0()) === true) {
    return true;
  }
  if (validateXWin(logCol1()) === true) {
    return true;
  }
  if (validateXWin(logCol2()) === true) {
    return true;
  }
  if (validateXWin(logRow0()) === true) {
    return true;
  }
  if (validateXWin(logRow1()) === true) {
    return true;
  }
  if (validateXWin(logRow2()) === true) {
    return true;
  }
}

function checkForOWin() {
  if (validateOWin(logDiagDown()) === true) {
    return true;
  }
  if (validateOWin(logDiagUp()) === true) {
    return true;
  }
  if (validateOWin(logCol0()) === true) {
    return true;
  }
  if (validateOWin(logCol1()) === true) {
    return true;
  }
  if (validateOWin(logCol2()) === true) {
    return true;
  }
  if (validateOWin(logRow0()) === true) {
    return true;
  }
  if (validateOWin(logRow1()) === true) {
    return true;
  }
  if (validateOWin(logRow2()) === true) {
    return true;
  }
}
