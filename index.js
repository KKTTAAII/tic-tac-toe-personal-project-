const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const form = document.getElementById("form");
const startBtn = document.getElementById("startBtn");
const restart = document.getElementById("restartBtn");
const wanring = document.createElement("div");
let p1 = player1.value;
let p2 = player2.value;

player1.addEventListener("change", e => {
  p1 = e.target.value;
});

player2.addEventListener("change", e => {
  p2 = e.target.value;
});

function restartGame() {
  wanring.classList.add("hide");
  window.location.reload(false);
}

form.addEventListener("submit", e => {
  e.preventDefault();
  if (p1 !== undefined && p2 !== undefined && p1 !== p2) {
    startBtn.classList.add("hide");
    restart.classList.remove("hide");
    wanring.classList.add("hide");
    new Game(p1, p2);
    restart.addEventListener("click", restartGame);
  } else {
    wanring.innerText = "please select differen icons";
    wanring.classList.add("warning");
    form.append(wanring);
  }
});
