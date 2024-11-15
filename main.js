let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain")
let scoreDisplay = document.querySelector(".scoreDisplay");
let width = 10;
let currentIndex = 0;
let frogIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;
let frogImg = document.createElement('img');
frogImg.src = './frog.png';
frogImg.width = 30;

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keyup", control);
    createBoard();
    startGame();
    playAgain.addEventListener("click", replay);
});

function createBoard() {
    popup.style.display = "none";
    for (let c = 0; c < 10; c++) {
        for (let r = 0; r < 10; r++) {
            let div = document.createElement("div");
            grid.appendChild(div);
        } 
    }
}

function startGame() {
    let squares = document.querySelectorAll(".grid div");
    randomfrog(squares);
    // attempt to add a few more frogs - does not work
    // setInterval((randomfrog(squares)), 2000);
    direction = 1;
    score = 0;
    scoreDisplay.innerHTML = `Score: ${score}`;
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
        squares[currentSnake[0]].classList.remove("frogImg");
        document.querySelector('.frog').removeChild(frogImg);
        randomfrog(squares);
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        clearInterval(interval);
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcome, intervalTime);
    }
}

function randomfrog(squares) {
    do {
        frogIndex = Math.floor(Math.random() * 100);
    } while (squares[frogIndex].classList.contains("snake"));
    squares[frogIndex].classList.add("frog");
    document.querySelector('.frog').appendChild(frogImg);
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

function replay() {
    grid.innerHTML = "";
    createBoard();
    startGame();
    popup.style.display = "none";
}