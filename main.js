let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain")
let scoreDisplay = document.querySelector(".scoreDisplay");
// let left = document.querySelector(".left");
// let bottom = document.querySelector(".bottom");
// let right = document.querySelector(".right");
// let up = document.querySelector(".top");
let width = 10;
let currentIndex = 0;
let frogIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;
// let frog = document.querySelector(".frog");
let frogImg = document.createElement('img');
frogImg.src = './frog.png';
frogImg.width = 20;


document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keyup", control);
    createBoard();
    startGame();
    playAgain.addEventListener("click", replay);
});

function createBoard() {
    popup.style.display = "none";
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let div = document.createElement("div");
            grid.appendChild(div);
        } 
    }
}

function startGame() {
    let squares = document.querySelectorAll(".grid div");
    randomfrog(squares);
    document.querySelector('.frog').appendChild(frogImg);
    //frog.src = './frog.png';
    //random frog
    direction = 1;
    scoreDisplay.innerHTML = score;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime);
}

function moveOutcome() {
    let squares = document.querySelectorAll(".grid div");
    if (checkForHits(squares)) {
        alert("you hit something!");
        popup.style.display = "flex";
        return clearInterval(interval);
    } else {
        moveSnake(squares);
    }
}

function moveSnake(squares) {
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    //movement ends here
    eatfrog(squares, tail);
    squares[currentSnake[0]].classList.add("snake");
}

function checkForHits(squares) {
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) || 
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <= 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        return true;
    } else {
        return false;
    }
}

function eatfrog(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("frog")) {
        squares[currentSnake[0]].classList.remove("frog");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        randomfrog(squares);
        //randomfrog.src = "./img/frog.png";
        score++;
        scoreDisplay.textContent = score;
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcome, intervalTime);
    }
}

function randomfrog(squares) {
    do {
        frogIndex = Math.floor(Math.random() * squares.length);
    } while (squares[frogIndex].classList.contains("snake"));
    squares[frogIndex].classList.add("frog");

    // frog.appendChild(frogImg)
    // frog.src = "./frog.png"
    //document.querySelector('.frog').src = './frog.png';
    //frogIndex.src = './frog.png';
}

document.onkeydown = control;

function control(e) {
    e = e || window.event;
    if (e.keyCode == 39) {
        direction = 1; //right
    } else if (e.keyCode == 38) {
        direction = -width; //snake goes 10 divs up when up arrow is used
    } else if (e.keyCode == 37) {
        direction = -1; //left, snake goes left one div 
    } else if (e.keyCode == 40) {
        direction = +width; //snake moves 10 divs down when down key is used
    }
}

// up.addEventListener("click", () => (direction = -width));
// bottom.addEventListener("click", () => (direction = +width));
// left.addEventListener("click", () => (direction = -1));
// right.addEventListener("click", () => (direction = 1));


function replay() {
    grid.innerHTML = "";
    createBoard();
    startGame();
    popup.style.display = "none";
}