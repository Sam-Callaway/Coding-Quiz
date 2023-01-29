var scoresOl = document.getElementById("highscores");
var clearBtn = document.getElementById("clear")

  // Render the highscores on the page sorting them and then creating the HTML elements and appending to the page
function highscoreRender(){
    console.log("highscorerender")
    scoresOl.innerHTML = ""
    // Retrieve the scores from local storage
    var highScores = JSON.parse(localStorage.getItem("highScores"));
    // If there are no scores to retrieve then just generate and show this message
    if (highScores === null){
        var entry = document.createElement("h2");
      entry.textContent = "Play the quiz to add to the high scores!"
      scoresOl.appendChild(entry)
    }
    else
    {
    // Sort the high scores into descending order based on score
    var highScoresSorted = highScores.sort(
      (p1, p2) => (p1.score < p2.score) ? 1 : (p1.score > p2.score) ? -1 : 0);  

    // Generate the HTML elements for each score and append them to the page
    highScoresSorted.forEach(element => {
      var entry = document.createElement("h2");
      entry.textContent = (element.initials + ": " + element.score)
    scoresOl.appendChild(entry)
    });}
  };

    // If the user presses the clear button then we delete the scores from storage and then run the highscoreRender again
  clearBtn.addEventListener("click",function(){
    localStorage.removeItem("highScores")
    highscoreRender();
  });

    // Run the render function when the user opens the page
highscoreRender();