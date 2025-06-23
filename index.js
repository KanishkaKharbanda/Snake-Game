let inputDir = { x: 0, y: 0 };
let speed = 5;
let score = 0;
let hiscoreval = 0;
let lastPaintTime = 0;
let gameStarted = false;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let obstacles = [];

const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) return true;

  for (let obs of obstacles) {
    if (obs.x === snake[0].x && obs.y === snake[0].y) return true;
  }

  return false;
}

function generateValidFoodPosition() {
  let a = 2, b = 16;
  let newFood;
  while (true) {
    newFood = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random())
    };
    if (
      !snakeArr.some(segment => segment.x === newFood.x && segment.y === newFood.y) &&
      !obstacles.some(obs => obs.x === newFood.x && obs.y === newFood.y)
    ) {
      break;
    }
  }
  return newFood;
}

function gameEngine() {
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    document.querySelector(".body").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "block";
    document.getElementById("finalScore").textContent = score;
    document.getElementById("highScoreOnEnd").textContent = hiscoreval;
    return;
  }

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score++;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      localStorage.setItem("hiscoreObstacles", JSON.stringify(obstacles));
      document.getElementById("hiscoreBox").innerHTML = "High Score: " + hiscoreval;
    }
    document.getElementById("scoreBox").innerHTML = "Score: " + score;
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });

    food = generateValidFoodPosition();
    obstacles = generateRandomObstacles();

    if (score % 5 === 0) speed += 2;
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  const board = document.getElementById("board");
  board.innerHTML = "";

  snakeArr.forEach((e, index) => {
    let element = document.createElement("div");
    element.style.gridRowStart = e.y;
    element.style.gridColumnStart = e.x;
    element.classList.add(index === 0 ? "head" : "snake");
    board.appendChild(element);
  });

  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);

  obstacles.forEach((obs) => {
    let obsElement = document.createElement("div");
    obsElement.style.gridRowStart = obs.y;
    obsElement.style.gridColumnStart = obs.x;
    obsElement.classList.add("obstacle");
    board.appendChild(obsElement);
  });
}

function generateRandomObstacles(count = 3) {
  const patterns = [
    (x, y) => [{x, y}, {x: x+1, y}, {x: x+2, y}],
    (x, y) => [{x, y}, {x, y: y+1}, {x, y: y+2}],
    (x, y) => [{x, y}, {x: x+1, y}, {x, y: y+1}, {x: x+1, y: y+1}],
    (x, y) => [{x, y}, {x: x+1, y}, {x, y: y+1}]
  ];

  let obs = [];
  while (obs.length < count * 3) {
    let baseX = Math.floor(Math.random() * 14) + 1;
    let baseY = Math.floor(Math.random() * 14) + 1;
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    const shape = pattern(baseX, baseY);
    if (shape.every(p =>
      (p.x !== food.x || p.y !== food.y) &&
      !snakeArr.some(s => s.x === p.x && s.y === p.y) &&
      p.x > 0 && p.x < 18 && p.y > 0 && p.y < 18
    )) {
      obs.push(...shape);
    }
  }
  return obs;
}

function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.querySelector(".body").style.display = "flex";
  musicSound.play();
  gameStarted = true;
  obstacles = generateRandomObstacles();
  food = generateValidFoodPosition();
  window.requestAnimationFrame(main);
}

function restartGame() {
  score = 0;
  speed = 5;
  snakeArr = [{ x: 13, y: 15 }];
  food = generateValidFoodPosition();
  obstacles = generateRandomObstacles();
  document.getElementById("gameOverScreen").style.display = "none";
  document.querySelector(".body").style.display = "flex";
  musicSound.currentTime = 0;
  musicSound.play();
  gameStarted = true;
  window.requestAnimationFrame(main);
}

function exitGame() {
  document.getElementById("gameOverScreen").innerHTML = '<h2>Thanks for Playing!</h2>';
}

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  document.getElementById("hiscoreBox").innerHTML = "High Score: " + hiscoreval;
}

let savedObs = localStorage.getItem("hiscoreObstacles");
if (savedObs) {
  obstacles = JSON.parse(savedObs);
}

window.addEventListener("keydown", (e) => {
  if (!gameStarted) return;
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
  }
});

