let isSelecting = false;

function generatePuzzle() {
  const wordsInput = document.getElementById("word-input");
  const words = wordsInput.value
    .split(",")
    .map((word) => word.trim().toUpperCase());

  const puzzleContainer = document.getElementById("puzzle-container");
  puzzleContainer.innerHTML = "";

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let puzzle = [];

  // Create a 10x10 puzzle grid with random alphabet letters
  for (let i = 0; i < 10; i++) {
    let row = [];
    for (let j = 0; j < 10; j++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      const randomLetter = alphabet[randomIndex];
      row.push(randomLetter);
    }
    puzzle.push(row);
  }

  // Insert words into the puzzle
  words.forEach((word) => {
    let direction = Math.random() > 0.5 ? "horizontal" : "vertical";
    let startX = Math.floor(Math.random() * (10 - word.length + 1));
    let startY = Math.floor(Math.random() * 10);

    if (direction === "horizontal") {
      for (let i = 0; i < word.length; i++) {
        puzzle[startX][startY + i] = word[i];
      }
    } else {
      for (let i = 0; i < word.length; i++) {
        puzzle[startX + i][startY] = word[i];
      }
    }
  });

  // Render the puzzle grid
  puzzle.forEach((row) => {
    row.forEach((letter) => {
      const cell = document.createElement("div");
      cell.className = "puzzle-cell";
      cell.textContent = letter;
      cell.onmouseover = () => selectCell(cell);
      puzzleContainer.appendChild(cell);
    });
  });
}

function startSelection(event) {
  isSelecting = true;
  clearSelection();
  selectCell(event.target);
  event.preventDefault();
}

function endSelection() {
  isSelecting = false;
  clearSelection();
}

function selectCell(cell) {
  if (isSelecting) {
    cell.classList.add("selected");
  }
}

function clearSelection() {
  const selectedCells = document.querySelectorAll(".selected");
  selectedCells.forEach((cell) => {
    cell.classList.remove("selected");
  });
}
