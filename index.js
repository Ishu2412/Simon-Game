/*-------------------------user---------------------------------*/
var level=0;
var userClickedPattern=[];
$(".btn").on("click",function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

$(document).on("keypress",function(){
  if(level===0){
    nextSequence();
  }
});

/*-------------------------computer------------------------------*/
var colors=["red","blue","green","yellow"];
var gamePattern=[];

/*------------------------functions------------------------------*/
function nextSequence(){
  userClickedPattern=[];
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=colors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
  level++;
  $("h1").text("Level "+level);
}

function checkAnswer(i){
  if(userClickedPattern[i]===gamePattern[i]){
    if(userClickedPattern.length===gamePattern.length){
    nextSequence();
   }
  }
  else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    gamePattern=[];
    level=0;
  }
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100);
}
