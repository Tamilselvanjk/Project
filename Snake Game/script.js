const gameBoard = document.getElementById('gameboard');
const context = gameBoard.getContext("2d");
const scoreText = document.getElementById('scoreVal');

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 25;


let foodX;
let foodY;
let xVel = 25;
let yVel = 0;
let score = 0;
let active = true;

//starting game no started
let started = false;
//pause game
let paused = false;




//Snake body parts (75,50,25,0)
let snake = [
    { x: UNIT * 3, y: 0 },
    { x: UNIT * 2, y: 0 },
    { x: UNIT, y: 0 },
    { x: 0, y: 0 }
]

//press the keyboard keys
window.addEventListener('keydown', keyPress)

startGame();

function startGame() {
    context.fillStyle = "#212121"
    //fillRectangle (Xstart,Ystart,width,height)
    context.fillRect(0, 0, WIDTH, HEIGHT);

    createFood();
    displayFood();
    drawSnake();
}

function clearBoard() {
    context.fillStyle = "#212121"
    //fillRectangle (Xstart,Ystart,width,height)
    context.fillRect(0, 0, WIDTH, HEIGHT);
}



//created Random food position 
function createFood() {
   do{
    foodX = Math.floor(Math.random() * WIDTH / UNIT) * UNIT;
    foodY = Math.floor(Math.random() * HEIGHT / UNIT) * UNIT;
   }
   while(snake.some(snakePart =>
    snakePart.x === foodX && snakePart.y === foodY));
    //Keep generating new food position if it overlaps with the snake

    //Set the new food coordinates
    food = {x:foodX , y:foodY}
}


//created a snake food
function displayFood() {
    const gradient = context.createRadialGradient(
        foodX + UNIT / 2, foodY + UNIT / 2, UNIT / 6,
        foodX + UNIT / 2, foodY + UNIT / 2, UNIT /2
    )

    gradient.addColorStop(0, '#ff6666');
    gradient.addColorStop(1, '#cc0000')




    context.fillStyle = gradient;
    //start new draw path
    context.beginPath();
    // context.arc(x, y, radius, startAngle, endAngle)
    context.arc(foodX + UNIT / 2, foodY + UNIT / 2, UNIT / 2, 0, Math.PI * 2);
    //the circle with current fillStyle
    context.fill()


    context.shadowColor = "rgba(0, 0, 0, 0.5)";
    context.shadowBlur = 10;
    context.shadowOffsetX = 4;
    context.shadowOffsetY = 4;
}

//Draw snake
function drawSnake() {
    context.fillStyle = '#29f529'
    context.strokeStyle = '#212121'

    //snake body and parts setting
    snake.forEach((snakePart) => {
        context.beginPath()
        context.arc(snakePart.x + UNIT / 2, snakePart.y + UNIT / 2, UNIT / 2, 0, Math.PI * 2);
        context.fill()
        context.stroke()
    })

}

//snake self collision
function checkSelfCollision() {
    //get snake head
    const head = snake[0];

    //check if the head collides with any part of the snake's body
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true; //collision detected
        }
    }
    return false;// no collision
}

function moveSnake() {
    //snake head adding
    //snake body parts added with xVel(25) yVel(0)   
    const head = {
        x: snake[0].x + xVel,
        y: snake[0].y + yVel
    }

    //Add new head to the front of the snake             
    snake.unshift(head)

    if (snake[0].x == foodX && snake[0].y == foodY) {
        //Increase score value
        score += 1;
        scoreText.textContent = score;
        createFood();
    }

    else {
        //remove the tail if no food is eaten
        snake.pop()
    }

    //check for self-collision (game over)
    if (checkSelfCollision()) {
        active = false;// set the game inactive
        console.log("Game Over - Snake touched itself!");
    }
}

function nextTick() {
    if (active && !paused) {
        setTimeout(() => {
            clearBoard();
            displayFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 200);
    }
    else if (!active) {
        clearBoard();
        context.font = "bold 50px serif";
        context.fillStyle = "crimson";
        context.textAlign = "center";
        context.fillText("Game Over!!", WIDTH / 2, HEIGHT / 2)
    }

}

function keyPress(event) {
    //key pressed game starting
    if (!started) {
        started = true;
        nextTick();
    }

    //pause when space is pressed
    if (event.keyCode === 32) {
        console.log('clicked')

        if (paused) {
            paused = false;
            nextTick();
        }
        else {
            paused = true;
        }
    }

    //KEY Codes
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    const PAUSE = 32;

    switch (true) {
        //left key pressed and not going right
        case (event.keyCode == LEFT && xVel != UNIT):
            xVel = -UNIT;
            yVel = 0;
            break;
        //right key pressed and not going left   
        case (event.keyCode == RIGHT && xVel != -UNIT):
            xVel = UNIT;
            yVel = 0;
            break;
        //up key pressed and not going down
        case (event.keyCode == UP && yVel != UNIT):
            xVel = 0;
            yVel = -UNIT;
            break;
        //down key pressed and not going up     
        case (event.keyCode == DOWN && yVel != -UNIT):
            xVel = 0;
            yVel = UNIT;
            break;
    }

}

//Gameover left,right,up,down
function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
        case (snake[0].x >= WIDTH):
        case (snake[0].y < 0):
        case (snake[0].y >= HEIGHT):
            active = false;
            break;
    }

}

