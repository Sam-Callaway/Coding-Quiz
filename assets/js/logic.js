// Function playQuiz() that event listens for pressing start quiz button and contains the code for running the other functions that make up the quiz
// On start playQuiz() need to hide the start-screen div and show the questions div by changing the class
// Initialise a timer 
// Function nextQuestion() to pick a question from the questions.js file
// 
//
//
// 
var startBtn = document.getElementById("start");
var startScreen = document.getElementById("start-screen");
var questionsScreen = document.getElementById("questions");
var endScreen = document.getElementById("end-screen");
var timer = document.getElementById("time");

startBtn.addEventListener("click",function(){
    playQuiz()
  });


function playQuiz(){
    console.log("Let's play!")
    randomquestions = shuffle(questions)
    startScreen.setAttribute("class","hide")
    questionsScreen.setAttribute("class","start")
    countdown();    
}


//This shuffle function was taken from here: https://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function endQuiz(){
    questionsScreen.setAttribute("class","hide")
    endScreen.setAttribute("class","start")
}

function nextQuestion(){
    for (i = 0; i < 10; i++){
        
    }
}

function countdown() {
    var timeLeft = 101;
  
    var timeInterval = setInterval(function () {
      timeLeft--;
      timer.textContent = timeLeft
        console.log(timer)
      if(timeLeft === 0) {
        endQuiz();
        return;
      }
    },1000);
  }