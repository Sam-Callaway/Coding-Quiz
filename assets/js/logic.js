
var startBtn = document.getElementById("start");
var highscoreBtn = document.getElementById("submit")
var startScreen = document.getElementById("start-screen");
var correctScreen = document.getElementById("correct-screen");
var wrongScreen = document.getElementById("wrong-screen");
var questionsScreen = document.getElementById("questions");
var endScreen = document.getElementById("end-screen");
var timer = document.getElementById("time");
var timeScreen = document.getElementById("timer");
var questionTitle = document.getElementById("question-title");
var choices = document.getElementById("choices");
var finalScore = document.getElementById("final-score");
var initials = document.getElementById("initials");
var errorEl = document.getElementById("error-message");

var timeLeft = 101
var score = 0
var scoreTimer = 12
var questionIndex = 0
const winAudio = new Audio("./assets/sfx/correct.wav");
const loseAudio = new Audio("./assets/sfx/incorrect.wav");


startBtn.addEventListener("click",function(){
    playQuiz()
  });

highscoreBtn.addEventListener("click",function(){
    highscoreSubmit();
});  

function playQuiz(){
  // Reset the timeLeft variable in case the user has played once already
    timeLeft = 101
  // Shuffle the questions so they are not in the same order each time the user plays
    randomQuestions = shuffle(questions);
  // Hide the start screen and show the questions screen
    startScreen.setAttribute("class","hide");
    questionsScreen.setAttribute("class","start");
  // Start the clock to count down time left on the quiz
    tick = setInterval(tickTock, 1000);  
    runQuiz();
    };

// This function handles getting the next question and setting the event listeners for the user to answer
function runQuiz(){
  var chosenAnswer = "" 
  // Use questionIndex to see which question we're on. Once the user has answered 10 then the quiz ends
  if (questionIndex === 10){setTimeout(function() {
    endQuiz()
  }, 1000);return;}
  // nextQuestion() will select the question title and answers from the questions.js file and generate the html elements
  nextQuestion(questionIndex)
  // Select the answer buttons and loop through them adding the event listeners
  ans = document.querySelectorAll(".answerButton");
  for (j = 0; j < ans.length; j++){
    ans[j].addEventListener("click",function(event){
    chosenAnswer = event.target.textContent
    // If the answer is correct
      if (chosenAnswer ==  randomQuestions[questionIndex].correctAnswer)
      {
        // Play winning audio
        winAudio.play();
        // The score timer resets each question and ticks down. If the user answers quickly they get a higher score. If the score timer has gone past 1 then they will get 1 point.
        if (scoreTimer < 1){
          score++
        }
        else
        {score = score + scoreTimer}
        // Increment the question index and show the correct screen
        questionIndex++
        correctScreen.setAttribute("class","start");
        questionsScreen.setAttribute("class","hide");
        timeScreen.setAttribute("class","hide");
        // Add a second to the timeLeft to compensate the user for the second used to show correctScreen
        timeLeft++
        // After showing the correct screen for a second we hide it and show the question screen again. Unless we've reached the end of the quiz or out of time and then don't show and the end-screen will show after
        setTimeout(function() {
          correctScreen.setAttribute("class", "hide");
          if (questionIndex < 10 && timeLeft > 0){
          timeScreen.setAttribute("class","timer start");
          questionsScreen.setAttribute("class","start");
          }
        }, 1000);
        runQuiz()
      }
      else
      // If the user gets it wrong. Mostly the same as above except removing time left instead of adding to their score
      {
        loseAudio.play();
        timeLeft = timeLeft - 10
        questionIndex++
        wrongScreen.setAttribute("class","start");
        questionsScreen.setAttribute("class","hide");
        timeScreen.setAttribute("class","hide");
        timeLeft++
        setTimeout(function() {
          wrongScreen.setAttribute("class", "hide");
          if (questionIndex < 10 && timeLeft > 0){
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


// This function handles the clock and monitors to end the quiz if the user runs out of time
function tickTock()
{
  timeLeft --
  scoreTimer--
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



function nextQuestion(i){
  scoreTimer = 12
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
  // Hide the questions screen and show the end screen.
function endQuiz(){
  questionsScreen.setAttribute("class","hide")
  endScreen.setAttribute("class","start")
  clearInterval(tick)
  timeLeft = 0
  finalScore.textContent = score
  timeScreen.setAttribute("class","hide")
}

 
function highscoreSubmit(){
  // Show an error message and stop the function if the user hasn't entered anything or the entered something more than 3 initials
  if(initials.value === "" || initials.value.length > 3){errorEl.setAttribute("class","start");return;}
  // Retrieve the high scores from local storage
  var highScores = JSON.parse(localStorage.getItem("highScores"));
  // If there is nothing in storage then we create a new array. Else, push to the existing array
  // Take the user's initials and score and save them to localStorage
  if (highScores === null){
    highScores = [{
      initials: initials.value,
      score: score
    }]
  }
  else
  {
    highScores.push({
      initials: initials.value,
      score: score
    })
  }
  // Load the scores back up to local storage and take the user to the highscores.html page
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.replace("highscores.html");
};



