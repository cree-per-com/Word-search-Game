const words = ["apple", "banana", "orange", "grape"];
const puzzleSize = 10;
let puzzle = [];

function generateRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function generateRandomPuzzle() {
  puzzle = []; // 기존 퍼즐을 초기화
  for (let i = 0; i < puzzleSize; i++) {
    const row = [];
    for (let j = 0; j < puzzleSize; j++) {
      row.push(generateRandomLetter());
    }
    puzzle.push(row);
  }
}

function placeWordsInPuzzle() {
  words.forEach((word) => {
    const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
    let startRow = Math.floor(Math.random() * puzzleSize);
    let startCol = Math.floor(Math.random() * puzzleSize);

    // 단어를 배치할 수 있는 위치를 찾을 때까지 반복
    while (wordDoesNotFit(word, direction, startRow, startCol)) {
      startRow = Math.floor(Math.random() * puzzleSize);
      startCol = Math.floor(Math.random() * puzzleSize);
    }

    if (direction === "horizontal") {
      for (let i = 0; i < word.length; i++) {
        puzzle[startRow][startCol + i] = word[i];
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        puzzle[startRow + i][startCol] = word[i];
      }
    }
  });
}

function renderPuzzle() {
  const puzzleContainer = document.getElementById("puzzle-container");
  puzzle.forEach((row, rowIndex) => {
    row.forEach((letter, colIndex) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = letter;
      cell.addEventListener("click", () => handleCellClick(rowIndex, colIndex));
      puzzleContainer.appendChild(cell);
    });
  });
}

function wordDoesNotFit(word, direction, startRow, startCol) {
  // 단어가 퍼즐의 범위를 벗어나거나 이미 값이 채워진 셀에 단어가 겹치는 경우 true 반환
  if (direction === "horizontal" && startCol + word.length > puzzleSize) {
    return true;
  }
  if (direction === "vertical" && startRow + word.length > puzzleSize) {
    return true;
  }

  for (let i = 0; i < word.length; i++) {
    if (
      direction === "horizontal" &&
      puzzle[startRow][startCol + i] !== undefined
    ) {
      return true;
    }
    if (
      direction === "vertical" &&
      puzzle[startRow + i][startCol] !== undefined
    ) {
      return true;
    }
  }

  return false;
}

function handleCellClick(row, col) {
  // 클릭된 셀에 대한 처리 로직
}

function initGame() {
  generateRandomPuzzle();
  placeWordsInPuzzle();
  renderPuzzle();
}
// ... (앞부분은 그대로 두세요)

function initGame() {
  generateRandomPuzzle();
  placeWordsInPuzzle();
  renderPuzzle();
}

// 초기 게임 시작
initGame();
