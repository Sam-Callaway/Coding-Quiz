
var startBtn = document.getElementById("start");
var startScreen = document.getElementById("start-screen");
var correctScreen = document.getElementById("correct-screen");
var wrongScreen = document.getElementById("wrong-screen");
var questionsScreen = document.getElementById("questions");
var endScreen = document.getElementById("end-screen");
var timer = document.getElementById("time");
var timeScreen = document.getElementById("timer");
var questionTitle = document.getElementById("question-title");
var choices = document.getElementById("choices")
var timeLeft = 101
var score = 0
var questionIndex = 0
const winAudio = new Audio("./assets/sfx/correct.wav");
const loseAudio = new Audio("./assets/sfx/incorrect.wav");

startBtn.addEventListener("click",function(){
    playQuiz()
  });


function playQuiz(){
    timeLeft = 101
    console.log("Let's play!");
    randomQuestions = shuffle(questions);
    startScreen.setAttribute("class","hide");
    questionsScreen.setAttribute("class","start");
    setInterval(tickTock, 1000);  
    runQuiz();
    };


function runQuiz(){
  var chosenAnswer = "" 
  if (questionIndex === 10){setTimeout(function() {
    endQuiz()
  }, 1000);}

  nextQuestion(questionIndex)
  ans = document.querySelectorAll(".answerButton");
  for (j = 0; j < ans.length; j++){
    ans[j].addEventListener("click",function(event){
    chosenAnswer = event.target.textContent
      if (chosenAnswer ==  randomQuestions[questionIndex].correctAnswer)
      {
        winAudio.play();
        score = score + 10
        questionIndex++
        correctScreen.setAttribute("class","start");
        questionsScreen.setAttribute("class","hide");
        timeScreen.setAttribute("class","hide");
        timeLeft = timeLeft + 1
        setTimeout(function() {
          correctScreen.setAttribute("class", "hide");
          if (questionIndex < 10){
          timeScreen.setAttribute("class","timer start");
          questionsScreen.setAttribute("class","start");
          }
        }, 1000);
        console.log(questionIndex)
        console.log(score)
        runQuiz()
      }
      else
      {
        loseAudio.play();
        timeLeft = timeLeft - 10
        questionIndex++
        wrongScreen.setAttribute("class","start");
        questionsScreen.setAttribute("class","hide");
        timeScreen.setAttribute("class","hide");
        timeLeft = timeLeft + 1
        setTimeout(function() {
          wrongScreen.setAttribute("class", "hide");
          if (questionIndex < 10){
          timeScreen.setAttribute("class","timer start");
          questionsScreen.setAttribute("class","start");
          }
        }, 1000);
        console.log(questionIndex)
        console.log(score)
        runQuiz()
      }
})}

}



function tickTock()
{
  timeLeft --
  timer.textContent = timeLeft
  if (timeLeft < 2){
    setTimeout(function() {
      endQuiz()
    }, 1000);
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
    timeLeft = 1
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
    var button = document.createElement("button");
    button.textContent = element;
    button.setAttribute("class","answerButton")
    choices.appendChild(button)

  });
  

}

