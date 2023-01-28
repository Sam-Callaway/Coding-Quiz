var scoresOl = document.getElementById("highscores");
var clearBtn = document.getElementById("clear")

function highscoreRender(){
    console.log("highscorerender")
    scoresOl.innerHTML = ""
    var highScores = JSON.parse(localStorage.getItem("highScores"));
    if (highScores === null){
        var entry = document.createElement("h2");
      entry.textContent = "Play the quiz to add to the high scores!"
      scoresOl.appendChild(entry)
    }
    else
    {
    var highScoresSorted = highScores.sort(
      (p1, p2) => (p1.score < p2.score) ? 1 : (p1.score > p2.score) ? -1 : 0);  
    
    highScoresSorted.forEach(element => {
      var entry = document.createElement("h2");
      entry.textContent = (element.initials + ": " + element.score)
    scoresOl.appendChild(entry)
    });}
  };


  clearBtn.addEventListener("click",function(){
    localStorage.setItem("highScores",null)
    highscoreRender();
  });

  
highscoreRender();