const cells = document.querySelectorAll('.cell');
const positions = [
    { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 },
    { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 },
    { row: 3, col: 1 }, { row: 3, col: 2 }, { row: 3, col: 3 }
];

let board = [null, null, null, null, null, null, null, null, null]; //Array for X or O
// cells.forEach(cell => cell.textContent = '');
let currentPlayer = 'X'; 
const winMessage = document.getElementById('winMessage');
let gameOver = false;

cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        const position = positions[index];

        console.log(e.target.textContent);

        if (board[index] === null) {
            board[index] = currentPlayer; //draw X or O
            e.target.textContent = currentPlayer;

            //switch player
            if(currentPlayer === "X"){
                currentPlayer = "O";
            } else {
                currentPlayer = "X";
            }
        } else {
            console.log("Cell has been already picked!");
        }
        win(); 
        console.log(gameOver);
    });
});

function win(){
    console.log("In win()");
    console.log(board);
    if (board[0] === 'X' && board[1] === 'X' && board[2] === 'X' ||
        board[3] === 'X' && board[4] === 'X' && board[5] === 'X' ||
        board[6] === 'X' && board[7] === 'X' && board[8] === 'X' ||

        board[0] === 'X' && board[3] === 'X' && board[6] === 'X' ||   
        board[1] === 'X' && board[4] === 'X' && board[7] === 'X' ||
        board[2] === 'X' && board[5] === 'X' && board[8] === 'X' ||
    
        board[0] === 'X' && board[4] === 'X' && board[8] === 'X' ||
        board[2] === 'X' && board[4] === 'X' && board[6] === 'X') {
        
            //player X wins
            console.log("Player 'X' wins");
            gameOver = true;
            winMessage.textContent = `Player X wins!`;
            winMessage.style.display = 'block';
            return;
    } 

    if (board[0] === 'O' && board[1] === 'O' && board[2] === 'O' ||
        board[3] === 'O' && board[4] === 'O' && board[5] === 'O' ||
        board[6] === 'O' && board[7] === 'O' && board[8] === 'O' ||
    
        board[0] === 'O' && board[3] === 'O' && board[6] === 'O' ||
        board[1] === 'O' && board[4] === 'O' && board[7] === 'O' ||
        board[2] === 'O' && board[5] === 'O' && board[8] === 'O' ||
    
        board[0] === 'O' && board[4] === 'O' && board[8] === 'O' ||
        board[2] === 'O' && board[4] === 'O' && board[6] === 'O') {
        
            // Player O wins
            console.log("Player 'O' wins");
            gameOver = true;
            winMessage.textContent = `Player O wins!`;
            winMessage.style.display = 'block';
            return;
    }
    
}

//new game
function restartGame() {
    console.log("Restart!")
    currentPlayer = "X";
    cells.forEach(cell => cell.textContent = '');

    board = [null, null, null, null, null, null, null, null, null]; //Array for X or O
    winMessage.textContent = ``;
    gameOver = false;
}
document.getElementById('restartButton').addEventListener('click', restartGame);

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
//snake
///////////////////////////////////////////////
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snakeSize = 40; // Snake size (doubled)
const speed = 4; // Constant speed
const snake = [{ x: 200, y: 200 }, { x: 160, y: 200 }, { x: 120, y: 200 }];
let food = generateFood();
let targetX = canvas.width / 2;
let targetY = canvas.height / 2;

// Detect mouse movement
window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate direction vector to the target (mouse position)
    const angle = Math.atan2(targetY - snake[0].y, targetX - snake[0].x);
    const dx = Math.cos(angle) * speed;
    const dy = Math.sin(angle) * speed;

    // Move the snake head
    const newHead = {
        x: snake[0].x + dx,
        y: snake[0].y + dy,
    };

    // Add the new head position
    snake.unshift(newHead);

    // Check if the snake eats the food
    if (
        Math.hypot(snake[0].x - food.x, snake[0].y - food.y) < snakeSize
    ) {
        food = generateFood(); // Generate new food
    } else {
        snake.pop(); // Remove the tail segment unless food is eaten
    }

    // Draw food
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(food.x, food.y, snakeSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw snake
    ctx.fillStyle = 'lime';
    snake.forEach((segment) => {
        ctx.beginPath();
        ctx.arc(segment.x, segment.y, snakeSize / 2, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(gameLoop);
}

function generateFood() {
    let foodPosition;
    let isValid;
    do {
        isValid = true;
        foodPosition = {
            x: Math.random() * (canvas.width - snakeSize * 2) + snakeSize,
            y: Math.random() * (canvas.height - snakeSize * 2) + snakeSize,
        };

        // Ensure food doesn't spawn on the snake
        for (let segment of snake) {
            if (
                Math.hypot(segment.x - foodPosition.x, segment.y - foodPosition.y) <
                snakeSize
            ) {
                isValid = false;
                break;
            }
        }
    } while (!isValid);

    return foodPosition;
}

gameLoop();