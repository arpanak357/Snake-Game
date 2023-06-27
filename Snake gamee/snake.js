

//board
var blockSize= 8;
var rows= 80;
var cols= 80;
var board;
var context;


//snake
var snakeX = blockSize * 15;
var snakeY = blockSize * 15;


//food
var foodX;
var foodY;

//velocity
var velocityX = 0;
var velocityY = 0;

//snake Body
var snakeBody = [];


window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board 

    placeFood();
    document.addEventListener("keyup", changeDirection);
    //    update();
    setInterval(update, 1000/10);
}

//upadating size of componenets
function update() {
 
    //board

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);
 
    //food

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);


    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    for( var i= snakeBody.length-1 ; i>0; i++){
        snakeBody[i]= snakeBody[i-1];

    //snake

    context.fillStyle="lime";
    snakeX += velocityX * blockSize ;
    snakeY += velocityY * blockSize ;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for( let i=0; i< snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    
}
}

//changind direction after user input
function changeDirection   () {
  if(e.code == "ArrowUp" && velocityY != 1) {
     velocityX = 0;
     velocityY = -1;
  }
  else if(e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  }
  else if(e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
 }
 else if(e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
 }
}


//placeing food randomly
function placeFood() {

    // Math.random() returns bn 0-1
    // then mul by cols or rows gives dec no
    // then floor to remove dec
    // then mul by blockSize to set location
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}