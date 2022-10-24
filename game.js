// Game resources

// BtnColors & Patterns
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];

// Game Start

var level = 0;
var started = false;
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    userClickPattern = [];
    nextSequence();
    started = true;
  }

});

// Next Sequence Function
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  flashAnimation("#" + randomChosenColor);
  playSound(randomChosenColor);

}

//  Clicked btn response

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (started == true) {
    userClickPattern.push(userChosenColor);
    checkAnswer();
  }
});

// Checking variables

var checkedAnswerlevel = 1;
var checkedAnswer = 0;

// Check Answer function

function checkAnswer() {

  // Check answer variables
  var answer = true;
  var checkedGamecolor = gamePattern[checkedAnswer];
  var checkedClickedcolor = userClickPattern[checkedAnswer];

  if (checkedClickedcolor === checkedGamecolor) {
    answer = true;
    if (level > checkedAnswerlevel) {
      checkedAnswerlevel++;
      checkedAnswer++;
    } else {
      setTimeout(nextSequence, 1000);
      userClickPattern = [];
      checkedAnswerlevel = 1;
      checkedAnswer = 0;
    }
  } else {
    answer = false;
    $("#level-title").text("You got it wrong! Press any key to restart.");
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
    }, 200)
    let wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    startOver();
  }

}

// Wrong answer restart function.

function startOver () {
  started = false;
  level = 0;
  gamePattern = [];
}

// Flash animation function

function flashAnimation(chosenBtn) {

  $(chosenBtn).fadeIn(100).fadeOut(100).fadeIn(100);

}

// Press animation Function

function animatePress(chosenBtn) {
  $("#" + chosenBtn).addClass("pressed");
  setTimeout(function() {
    $("#" + chosenBtn).removeClass("pressed");
  }, 100)
}

// Sound play function

function playSound(chosenBtn) {
  let sound = new Audio("sounds/" + chosenBtn + ".mp3");
  sound.play();
}
