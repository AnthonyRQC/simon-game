const gamePattern = [];
const usesrClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).animate({ opacity: 0 }).animate({ opacity: 1 });
    playSound(randomChosenColour);
    
    $(".btn").on("click", function(){       
        var userChosenColour = $(this).attr('id');
        playSound(userChosenColour);
        usesrClickedPattern.push(userChosenColour);
        console.log(usesrClickedPattern);
        animatePress(userChosenColour);
        
    });
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
$(document).one('keypress',function() {
    let level = 0;
    $("h1").text("Level " + level)
    nextSequence();

});

