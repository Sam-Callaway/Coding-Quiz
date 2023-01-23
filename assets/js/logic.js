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
var questionTitle = document.getElementById("question-title");
var choices = document.getElementById("choices")
var timeLeft = 101

startBtn.addEventListener("click",function(){
    playQuiz()
  });


function playQuiz(){
    console.log("Let's play!");
    randomQuestions = shuffle(questions);
    startScreen.setAttribute("class","hide");
    questionsScreen.setAttribute("class","start");
    time = setInterval(tickTock, 1000);
    var score = 0
    // for (var i = 0; i < 10; i++){
    // var correct = nextQuestion(i);
    // if (correct === true){
    //   score = score + 10
    // }
    // else 
    // {
    //   timeLeft = timeLeft - 10;
    // }
    // }

}
function tickTock()
{
  timeLeft --
  timer.textContent = timeLeft
  if (timeLeft < 1){
    endQuiz()
  }

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

function nextQuestion(i){
  // Delete the answers from the previous question
  while (choices.firstChild) {
    choices.removeChild(choices.firstChild);
  }
  // Set the question title to the next question
  questionTitle.textContent = randomQuestions[i].question

  // Create the list elements for each of the answers and append to choices div
  randomQuestions[i].answers.forEach(element => {
    var ul = document.createElement("ul");
    ul.textContent = element;
    choices.appendChild(ul)
  });

}

