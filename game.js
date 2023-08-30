var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];

var started = false;
var level = 0;
//initial check for game.
$(document).keypress(function () { 
    if (!started) {
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$()


//user chosen color
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    //console.log(userChosenColor)
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern)
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

//game sequence
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+level);
    randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
}

//sound function
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//animation on click
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed")
    setTimeout(function(){
            $("#"+currentColor).removeClass("pressed");
        },100);
    
}

function checkAnswer(currentlevel){
    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            console.log("success again");
            setTimeout(function(){
                nextSequence();
            },
            1000);
        }
    }else{
        playSound("wrong");
        $("#level-title").text("Game Over, Press any key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    // $(document).keypress(function(){
    //     location.reload();
    // })
}