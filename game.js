// Global variables needed for game
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var started = false;
var level = 0;

//=================Event Listeners=================================

// key listener to start/restart game
$(document).keypress(function () {
 
  //boolean check to see if game is already started
  if (!started) {
 
    // change title, call nextSequence function, change started to true
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// mouse click listener for buttons
$(".btn").click(function () {
  // variable to hold the user clicked button value
  var userChosenColor = this.id;

  // push the value into the userClickPattern array
  userClickPattern.push(userChosenColor);

  // play the sound associated with the user click value function
  playSound(userChosenColor);

  // animiate the button clicked function(pass in the parameter of the user chosen color)
  animatePress(userChosenColor);

  // function that compares the user pattern to the random generated pattern(pass in the parameter of the last color/button chosen)
  checkAnswer(userClickPattern.length - 1);
});

//==========Game Play functions====================================

// function to check user answers to random generated sequence
function checkAnswer(currentLevel) {
  // check if the current choice(last answer passed from event listener is the same)
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    // and the user and random generated choices in the user/game pattern arrays match
    if (userClickPattern.length === gamePattern.length) {
      // then delay by 2 seconds and call next sequence function
      setTimeout(function () {
        nextSequence();
      }, 2000);
    }

    // if above is not met, play "wrong" sound and animation for .2 seconds
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // then change game title and call start over function
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
};

// function to advance game sequence
function nextSequence() {
  
  // reset userClickPattern to empty array
  userClickPattern = [];
  
  // iterate level variable by one
  level++;
  
  // change title to current level
  $("#level-title").text("Level " + level);
  
  // random number generator to give a number between 0 and 4
  var randomNumber = Math.floor(Math.random() * 4);
  
  // variable that holds the color in the buttonColor at the index equal to the random generated number
  var randomChosenColor = buttonColors[randomNumber];
  
  // then push the random color chosen above into the game pattern array
  gamePattern.push(randomChosenColor);

  // fade in/out and play the sound of the button chosen at the ID that matches the random chosen color
  $("#" + randomChosenColor)
    .fadeIn(200)
    .fadeOut(200)
    .fadeIn(200);
  playSound(randomChosenColor);
};

// restart function that resets our level variable, empties the game pattern array and resets our start boolean
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
};

// function to play sounds associated user + random generated colors and gameplay
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

// function tha adds/removes a class from the CSS file to create an animated effect on a setTimeout of .1 seconds
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};
