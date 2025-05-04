let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let startBtn = document.getElementById("start");

// Desktop: Start game on keypress
document.addEventListener("keypress", function () {
  if (!started) {
    startGame();
  }
});

// Mobile: Start game on Start button click
startBtn.addEventListener("click", function () {
  if (!started) {
    startGame();
  }
});

function startGame() {
  started = true;
  startBtn.style.display = "none";
  level = 0;
  gameSeq = [];
  userSeq = [];
  levelUp();
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (level > highScore) {
      highScore = level;
    }
    h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>High Score: <b>${highScore}</b><br>Press any key or tap Start to play again.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(function (btn) {
  if (btn.id !== "start") {
    btn.addEventListener("click", btnPress);
  }
});

function reset() {
  started = false;
  startBtn.style.display = "inline-block";
}