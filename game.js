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
  userClickPattern.push(userChosenColor);
});

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
