var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function() {
	if(!started) {
		nextSequence();
		started = true;
	}
});

function playSound(name) {
	var audio = new Audio("sounds/"+name+".mp3");
	audio.play();
}

function animatePress(currentColour) {
	$("."+currentColour).addClass("pressed");

	setTimeout(function() {
		$("."+currentColour).removeClass("pressed");
	},100);
}

$(".btn").click(function() {
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);

	playSound(userChosenColour);

	animatePress(userChosenColour);

	checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
	userClickedPattern = [];

	level++;
	$("#level-title").html("Level "+level);

	var randomNumber = Math.floor(Math.random()*4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
	if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
		// console.log("success");

		if(userClickedPattern.length === gamePattern.length) {
			setTimeout(function() {
				nextSequence();
			}, 1000);
		}
	}
	else {
		playSound("wrong");

		$("body").addClass("game-over");
		setTimeout(function() {
			$("body").removeClass("game-over");
		}, 200);

		$("#level-title").html("Game Over, Press Any Key to Restart");

		startOver();
	}
}

function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}
