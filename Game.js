class Game {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.currentPlayer = p1;
    this.height = 3;
    this.width = 3;
    this.board = [];
    this.makeBoard();
    this.makeHtmlBoard();
    this.gameOver = false;
  }

  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }

  makeHtmlBoard() {
    const boardContainer = document.getElementById("board-container");
    const board = document.createElement("div");
    board.classList.add("board");
    boardContainer.append(board);

    for (let y = 0; y < this.height; y++) {
      const row = document.createElement("tr");
      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
        this.handleGameClick = this.handleClick.bind(this);
        cell.addEventListener("click", this.handleGameClick);
      }
      board.append(row);
    }
  }

  placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.innerText = this.currentPlayer;
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  handleClick(e) {
    const x = +e.target.id[2];
    const y = +e.target.id[0];

    if (isNaN(x) && isNaN(x)) {
      return;
    }

    this.board[y][x] = this.currentPlayer;

    if (!this.gameOver) {
      this.placeInTable(y, x);
    }

    if (this.checkForWin()) {
      this.gameOver = true;
      return this.endGame(`Player ${this.currentPlayer} won!`);
    }

    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame("Tie!");
    }

    this.currentPlayer = this.currentPlayer === this.p1 ? this.p2 : this.p1;
  }

  endGame(msg) {
    Swal.fire(msg);
  }

  checkForWin() {
    const win = cells => {
      return cells.every(([y, x]) => this.board[y][x] === this.currentPlayer);
    };

    const winCases = {
      horiz1: [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      horiz2: [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      horiz3: [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      verti1: [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      verti2: [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      verti3: [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      diagDR: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      diagDL: [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    };

    if (
      win(winCases["horiz1"]) ||
      win(winCases["horiz2"]) ||
      win(winCases["horiz3"]) ||
      win(winCases["verti1"]) ||
      win(winCases["verti2"]) ||
      win(winCases["verti3"]) ||
      win(winCases["diagDL"]) ||
      win(winCases["diagDR"])
    ) {
      return true;
    }
  }
}
