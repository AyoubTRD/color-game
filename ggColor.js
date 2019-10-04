var squares = document.querySelectorAll(".square");

var newColors = document.querySelector("#newColors");
var hardButton = document.querySelector("#hard");
var easyButton = document.querySelector("#easy")

var container = document.querySelector("#container")

var randomColors = [];
var footer = document.querySelector("footer")
var header = document.querySelector("#header")

var nav = document.querySelector("nav");

var body = document.body;

var randomRed = Math.floor((Math.random() * 256) + 1);
var randomGreen = Math.floor((Math.random() * 256) + 1);
var randomBlue = Math.floor((Math.random() * 256) + 1);
var randomRGB = "rgb(" + randomRed + ", " + randomGreen + ", " + randomBlue + ")"

var level = "hard"

var correctColor;
var displayRGB = document.querySelector("h1")

var feedback = document.querySelector("p")
var clickedColor;

playGame()

function playGame(){
  for(i = 0; i < squares.length; i++){
    squares[i].style.cursor = "pointer"
  }
  if(level == "hard"){
    generateColors(6);
    pickColor(6);
  }
  else if(level == "easy"){
    generateColors(3);
    pickColor(3);
  }
  container.classList.add("mt-5");
  container.classList.remove("mt-3");
  feedback.textContent = ""
  displaySquares()
  buttonReactions()
  squaresClick()
  if(correctColor === undefined){
    playGame()
  }
}
function displaySquares(){
  for(i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = randomColors[i]
  }
}
function generateColors(squaresNumber){
  for(i = 0; i < squaresNumber; i++){
    randomRed = Math.floor((Math.random() * 256) + 1);
    randomGreen = Math.floor((Math.random() * 256) + 1);
    randomBlue = Math.floor((Math.random() * 256) + 1);
    randomRGB = "rgb(" + randomRed + ", " + randomGreen + ", " + randomBlue + ")"
    randomColors[i] = randomRGB;
  }
}
function pickColor(squaresNumber){
  correctColor = randomColors[Math.floor((Math.random() * squaresNumber - 1) + 1)];
  displayRGB.textContent = correctColor;
}

function buttonReactions(){
  newColors.addEventListener("click", function(){
    playGame();
    this.textContent = "New Colors";
  })
  easyButton.addEventListener("click", function(){
    footer.classList.add("fixed-bottom")
    if(easyButton.classList.contains("active")){
      playGame();
    }else{
      easyButton.classList.add("active");
      hardButton.classList.remove("active");
      level = "easy";
      for(i = 3; i < squares.length; i++){
        squares[i].style.display = "none";
      }
      playGame()
    }
  })
  hardButton.addEventListener("click", function(){
    footer.classList.remove("fixed-bottom")
    if(hardButton.classList.contains("active")){
      playGame();
    }
    else{
      level = "hard";
      hardButton.classList.add("active");
      easyButton.classList.remove("active");
      for(i = 3; i < squares.length; i++){
        squares[i].style.display = "inline-block";
      }
      playGame()
    }
  })
}
function squaresClick(){
  
  for(i = 0; i < squares.length; i++){ 
    squares[i].addEventListener("click", function(){
      container.classList.remove("mt-5");
      container.classList.add("mt-3");
      clickedColor = this.style.backgroundColor; 
      if(clickedColor == correctColor){
        newColors.textContent = "Play Again";
        feedback.textContent = "Correct!";
        header.style.backgroundColor = correctColor;
        for(square = 0; square < squares.length; square++){
          squares[square].style.backgroundColor = correctColor;
        }
      }
      else {
        feedback.textContent = "Wrong!";
        this.style.backgroundColor = "#404040";
        this.style.cursor = "auto"
      }
    })
  }
}
