const buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []
var started = false
var level = 0

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

$('.btn').on('click', function(){
    var self = $(this)
    const userChosenColour = self.attr('id')
    playSound(userChosenColour)
    userClickedPattern.push(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
    console.log(userClickedPattern)
})

function nextSequence(){
    userClickedPattern = []
    $('#level-title').text("Level " + level)
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour)
    level++

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver()
    }

}

function startOver(){
    level = 0
    started = false
    gamePattern = []
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}



