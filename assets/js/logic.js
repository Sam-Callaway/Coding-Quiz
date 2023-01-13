// Function playQuiz() that event listens for pressing start quiz button and contains the code for running the other functions that make up the quiz
// On start playQuiz() need to hide the start-screen div and show the questions div by changing the class
// Function nextQuestion() to pick a question from the questions.js file
// 
//
//
// 
var startBtn = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var questionsScreen = document.querySelector("#questions");
var endScreen = document.querySelector("#end-screen");

startBtn.addEventListener("click",function(){
    playQuiz()
  });


function playQuiz(){
    console.log("Let's play!")
    startScreen.setAttribute("class","hide")
    questionsScreen.setAttribute("class","start")

}