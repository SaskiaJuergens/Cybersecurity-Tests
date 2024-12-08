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
const playBoard = document.querySelector(".play-board");

let foodX, foodY;
let snake = [{ x: 5, y: 10 }];  // Snake starts with one segment (head)
let score = 0;
let gameInterval;
let gridSize = 30;
let speed = 200;

const changeFoodPosition = () => {
    do {
    foodX = Math.floor(Math.random() * 30) +1;
    foodY = Math.floor(Math.random() * 30) +1;         
    } while (isFoodOnSnake(foodX, foodY));
}
const isFoodOnSnake = (foodX, foodY) => {
    return snake.some(segment => segment.x === foodX && segment.y === foodY);
}

const drawGame = () => {
    score = 0;
    snake = [{ x: 5, y: 10 }];
    speedX = 0;
    speedY = 0;

    //food
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    //snake head
    snake.forEach((segment, index) => {
        htmlMarkup += `<div class="snake" style="grid-area: ${segment.y + 1} / ${segment.x + 1}"></div>`;
    });
    playBoard.innerHTML = htmlMarkup;
}

const moveSnake = () => {
    let head = { ...snake[0] };
    
    // Update head position based on direction
    head.x += speedX;
    head.y += speedY;
    
    // Check if the snake hits the wall (wrap around)
    if (head.x < 0) head.x = gridSize - 1;
    if (head.x >= gridSize) head.x = 0;
    if (head.y < 0) head.y = gridSize - 1;
    if (head.y >= gridSize) head.y = 0;
    
    // Check if the snake eats food
    if (head.x === foodX && head.y === foodY) {
      score++;
      changeFoodPosition();
    } else {
      snake.pop();  // Remove last segment if no food is eaten
    }
  
    snake.unshift(head);  // Add the new head to the front
  }


// Handle mouse movement to follow the cursor
const handleMouseMove = (e) => {
    const rect = playBoard.getBoundingClientRect();
    const mouseX = Math.floor((e.clientX - rect.left) / rect.width * gridSize);
    const mouseY = Math.floor((e.clientY - rect.top) / rect.height * gridSize);
    
    // Determine direction of the snake's head movement towards the mouse
    if (mouseX > snake[0].x) {
      speedX = 1;
      speedY = 0;
    } else if (mouseX < snake[0].x) {
      speedX = -1;
      speedY = 0;
    } else if (mouseY > snake[0].y) {
      speedX = 0;
      speedY = 1;
    } else if (mouseY < snake[0].y) {
      speedX = 0;
      speedY = -1;
    }
  }
  
  // Start the game loop
  const startGame = () => {
    changeFoodPosition();
    gameInterval = setInterval(() => {
      moveSnake();
      drawGame();
    }, speed);
  }

  const initGame = () => {
    score = 0;
    snake = [{ x: 5, y: 10 }];
    speedX = 0;
    speedY = 0;
    startGame();
  }

  const stopGame = () => {
    clearInterval(gameInterval);
    alert("Game Over! Your Score: " + score);
  }

//start game
document.addEventListener("mousemove", handleMouseMove);
initGame();
