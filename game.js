let gamePattern = [];
let usersClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let clicks = 0;

function nextSequence() {
    level = level + 1;
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).animate({ opacity: 0 }).animate({ opacity: 1 });
    playSound(randomChosenColour);
    console.log("level: " + level);
    console.log("gamePatern " + gamePattern);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currenColour){
    $("#" + currenColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currenColour).removeClass("pressed");
    }, 100);
    
}

function checkAnswer() {
    clicks++;
    console.log("clicks: " + clicks);
    if (gamePattern[clicks - 1] === usersClickedPattern[clicks - 1]){
        console.log("right");
        return true;
    }
    else{
        $(".btn").addClass("disabled");
        playSound("wrong");
        $("h1").text("Game Over Press Any Key To Restart! ");
        console.log("game over");
        startGame();
        return false;
    }
}

function startGame() {
    $(document).one('keypress',function() {
        gamePattern = [];
        usersClickedPattern = [];
        level = 0;
        clicks = 0;
        nextSequence();
        $("h1").text("Level " + level);
        $(".btn").removeClass("disabled");
        
    });
}


$(".btn").addClass("disabled");
startGame();
$(".btn").on("click", function(){    
    if (!$(this).hasClass("disabled")) {
        var userChosenColour = $(this).attr('id');
        playSound(userChosenColour);
        usersClickedPattern.push(userChosenColour);
        console.log("clicks from user" + usersClickedPattern);
        console.log(level);
        animatePress(userChosenColour);
        
        if(checkAnswer()){
            if (gamePattern.length === usersClickedPattern.length){
                usersClickedPattern = [];
                clicks = 0;              
                setTimeout(function() {
                    nextSequence();
                }, 1000);   
            }
        }
        
      }   
});

