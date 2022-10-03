const gameState = {
  players: ["X", "O"],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  currentPlayer: "X",
  computerPlayer: "O",
  player1: null,
  player2: "Computer",
};

const inputForm = document.querySelector("#input-form");
const player1Display = document.querySelector("#p1name");
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
  renderNames();
});

function renderNames() {
  player1Display.innerText = gameState.player1;
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
  console.log(e.target.id);
  const index = e.target.id;
  const rowIdx = index[0];
  const colIdx = index[1];
  if (gameState.board[rowIdx][colIdx] === null) {
    gameState.board[rowIdx][colIdx] = gameState.currentPlayer;
    if (checkForDraw() !== true && checkForXWin() !== true) {
      compPlay();
    }
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

function compPlay() {
  function getRandomInt() {
    return Math.floor(Math.random() * 3);
  }
  console.log(playAtIdx);
  if (smartComp() !== false) {
    let [row, column] = smartComp();
    gameState.board[row][column] = gameState.computerPlayer;
    playAtIdx = false;
  } else {
    let randomRow = getRandomInt();
    let randomCol = getRandomInt();
    let randomElem = gameState.board[randomRow][randomCol];
    console.log(randomElem);
    while (randomElem !== null) {
      randomRow = getRandomInt();
      randomCol = getRandomInt();
      randomElem = gameState.board[randomRow][randomCol];
    }
    gameState.board[randomRow][randomCol] = gameState.computerPlayer;
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

let playAtIdx = false;

function smartComp() {
  playDiagDown(logDiagDown());
  if (playAtIdx !== false) {
    return playAtIdx;
  }
  playDiagUp(logDiagUp());
  if (playAtIdx !== false) {
    return playAtIdx;
  }
  playC0(logCol0());
  if (playAtIdx !== false) {
    return playAtIdx;
  }
  playC1(logCol1());
  if (playAtIdx !== false) {
    return playAtIdx;
  }
  playC2(logCol2());
  if (playAtIdx !== false) {
    return playAtIdx;
  }
  playR0(logRow0());
  if (playAtIdx !== false) {
    return playAtIdx;
  }
  playR1(logRow1());
  if (playAtIdx !== false) {
    return playAtIdx;
  }
  playR2(logRow2());
  if (playAtIdx !== false) {
    return playAtIdx;
  }
  return false;
}

function playDiagDown(arr) {
  if (arr.includes(null) && arr.indexOf("O") !== arr.lastIndexOf("O")) {
    playAtIdx = [arr.indexOf(null), arr.indexOf(null)];
    return playAtIdx;
  } else if (arr.includes(null) && arr.indexOf("X") !== arr.lastIndexOf("X")) {
    playAtIdx = [arr.indexOf(null), arr.indexOf(null)];
    return playAtIdx;
  }
}

function playDiagUp(arr) {
  if (arr.includes(null) && arr.indexOf("O") !== arr.lastIndexOf("O")) {
    playAtIdx = [
      gameState.board.length - 1 - arr.indexOf(null),
      arr.indexOf(null),
    ];
    return playAtIdx;
  } else if (arr.includes(null) && arr.indexOf("X") !== arr.lastIndexOf("X")) {
    playAtIdx = [
      gameState.board.length - 1 - arr.indexOf(null),
      arr.indexOf(null),
    ];
    return playAtIdx;
  }
}

function playC0(arr) {
  if (arr.includes(null) && arr.indexOf("O") !== arr.lastIndexOf("O")) {
    playAtIdx = [arr.indexOf(null), 0];
    return playAtIdx;
  } else if (arr.includes(null) && arr.indexOf("X") !== arr.lastIndexOf("X")) {
    playAtIdx = [arr.indexOf(null), 0];
    return playAtIdx;
  }
}

function playC1(arr) {
  if (arr.includes(null) && arr.indexOf("O") !== arr.lastIndexOf("O")) {
    playAtIdx = [arr.indexOf(null), 1];
    return playAtIdx;
  } else if (arr.includes(null) && arr.indexOf("X") !== arr.lastIndexOf("X")) {
    playAtIdx = [arr.indexOf(null), 1];
    return playAtIdx;
  }
}

function playC2(arr) {
  if (arr.includes(null) && arr.indexOf("O") !== arr.lastIndexOf("O")) {
    playAtIdx = [arr.indexOf(null), 2];
    return playAtIdx;
  } else if (arr.includes(null) && arr.indexOf("X") !== arr.lastIndexOf("X")) {
    playAtIdx = [arr.indexOf(null), 2];
    return playAtIdx;
  }
}

function playR0(arr) {
  if (arr.includes(null) && arr.indexOf("O") !== arr.lastIndexOf("O")) {
    playAtIdx = [0, arr.indexOf(null)];
    return playAtIdx;
  } else if (arr.includes(null) && arr.indexOf("X") !== arr.lastIndexOf("X")) {
    playAtIdx = [0, arr.indexOf(null)];
    return playAtIdx;
  }
}

function playR1(arr) {
  if (arr.includes(null) && arr.indexOf("O") !== arr.lastIndexOf("O")) {
    playAtIdx = [1, arr.indexOf(null)];
    return playAtIdx;
  } else if (arr.includes(null) && arr.indexOf("X") !== arr.lastIndexOf("X")) {
    playAtIdx = [1, arr.indexOf(null)];
    return playAtIdx;
  }
}

function playR2(arr) {
  if (arr.includes("null") && arr.indexOf("O") !== arr.lastIndexOf("O")) {
    playAtIdx = [2, arr.indexOf(null)];
    return playAtIdx;
  } else if (
    arr.includes("null") &&
    arr.indexOf("X") !== arr.lastIndexOf("X")
  ) {
    playAtIdx = [2, arr.indexOf(null)];
    return playAtIdx;
  }
}
