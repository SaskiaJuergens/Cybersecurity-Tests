const playBoard = document.querySelector(".play-board");

let foodX, foodY;
let snakeX =5, snakeY=10;
let speedX=0, speedY=0;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) +1;
    foodY = Math.floor(Math.random() * 30) +1;
}

const initGame = () => {
    //food
    let htmlMarkup = '<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>';
    //snake head
    htmlMarkup = '<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>';
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPostition();
initGame();

document.addEventListener("keydown", changeDirection);
const changeDirection = (e) => {
    console.log(e);
    if(e.key === "ArrowUp"){
        speedX = 0;
        speedY = -1;
    } else if (e.key === "ArrowDown"){
        speedX = 0;
        speedY = 1; 
    } else if (e.key === "ArrowLeft"){
        speedX = -1;
        speedY = 0; 
    } else if (e.key === "ArrowRight"){
        speedX = 1;
        speedY = 0; 
    }
}