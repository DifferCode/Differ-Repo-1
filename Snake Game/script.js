let board = document.getElementById("board");
let upButton = document.getElementById("up-button");
let downButton = document.getElementById("down-button");
let controlButtons = document.getElementsByClassName("control");
let resetButton = document.getElementById("reset-button");
let scoreDisplay = document.getElementById("score-display");
let ctx = board.getContext("2d");
let backgroundColor = "white";
let snakeColor = "magenta";
let snakeBorder = "black";
let foodColor = "red";
let foodBorder = "black";
let foodX;
let foodY;
let velocityX = 15;
let velocityY = 0;
let unitSize = 15;
let gameHeight = board.height;
let gameWidth = board.width;
let snake = [
    {x: unitSize * 5, y: 50},
    {x: unitSize * 4, y: 50},
    {x: unitSize * 3, y: 50},
    {x: unitSize * 2, y: 50},
    {x: 0, y: 50}
]
let running = false;
let score = 0;

for(let i = 0; i < controlButtons.length; i++) {
    controlButtons[i].addEventListener("click", () => {
        let direction = controlButtons[i].textContent;
        let goingDown = (velocityY == unitSize);
        let goingLeft = (velocityX == -unitSize);
        let goingUp = (velocityY == -unitSize);
        let goingRight = (velocityX == unitSize);

        
        switch (true) {
            case (direction == "U" && !goingDown):
                velocityY = -unitSize;
                velocityX = 0;
                break;
            case (direction == "R" && !goingLeft):
                velocityX = unitSize;
                velocityY = 0;
                break;
            case (direction == "D" && !goingUp):
                velocityY = unitSize;
                velocityX = 0;
                break;
            case (direction == "L" && !goingRight):
                velocityX = -unitSize;
                velocityY = 0;
                break;
        }

    });
}

resetButton.addEventListener("click", () => {
    snake = [
        {x: unitSize * 5, y: 50},
        {x: unitSize * 4, y: 50},
        {x: unitSize * 3, y: 50},
        {x: unitSize * 2, y: 50},
        {x: 0, y: 50}
    ]
    score = 0;
    scoreDisplay.textContent = score;
    running = true;
    velocityX = 15;
    velocityY = 0;
    gameStart();
});

gameStart();

function gameStart() {
    score = 0;
    scoreDisplay.textContent = score;
    running = true;
    generateFood();
    drawFood();
    nextTick();
}

function nextTick() {
    if(running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }else {
        displayGameOver();
    }
}

function displayGameOver() {
    ctx.fillStyle = "black";
    ctx.font = "25px MV Boli";
    ctx.textAlign = "center";
    ctx.fillText("BOBO MO TANGA HAHA", gameWidth / 2, gameHeight / 2);
}

function checkGameOver() {
    switch(true) {
        case (snake[0].x >= gameHeight):
            running = false;
            break;
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
    }
    
    for(let i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            running = false;
            return;
        }
    }
}

function moveSnake() {
    let head = {x: snake[0].x + velocityX, y: snake[0].y + velocityY};
    snake.unshift(head);
    if (Math.abs(snake[0].x - foodX) < unitSize && Math.abs(snake[0].y - foodY) < unitSize) {
    // The snake's head is close enough to the food, so it "eats" the food.
        score++;
        scoreDisplay.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }

}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}

function clearBoard() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function generateFood() {
    function generate(min, max) {
        let randomPos = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randomPos;
    }
    
    foodX = generate(0, gameHeight - unitSize);
    foodY = generate(0, gameWidth - unitSize);
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}