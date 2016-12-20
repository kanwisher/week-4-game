//waits until page is ready before starting manipulation//

window.onload = function () {
    document.getElementById('button').onclick = function () {
        document.getElementById('modal').style.display = "none"
    };
};


$(document).ready(function(){
	



//variables in scope of document ready function//
var gemArray = [];
var gemA;
var gemB;
var gemC;
var gemD;
var startingNumber;
var gameCount;
var wins = 0;
var losses = 0;

//audio calls//
var audioLose = new Audio("assets/sounds/lose.wav");
var audioWin = new Audio("assets/sounds/win.mp3");
var audio1 = new Audio("assets/sounds/gem1.mp3");
var audio2 = new Audio("assets/sounds/gem2.mp3");
var audio3 = new Audio("assets/sounds/gem3.mp3");
var audio4 = new Audio("assets/sounds/gem4.mp3");


//runs the reset game function for a fresh game with random variables

resetGame();


//gem 1 on click function//

$(".buttonA").click(function() {
	gemIncrease(gemA);
	audio1.currentTime = 0;
	audio1.play();
});



//gem 2 on click function//


$(".buttonB").click(function() {
	gemIncrease(gemB);
	audio2.currentTime = 0;
	audio2.play();
});



//gem 3 on click function//

$(".buttonC").click(function() {
	gemIncrease(gemC);
	audio3.currentTime = 0;
	audio3.play();
});


//gem 4 on click function//

$(".buttonD").click(function() {
	gemIncrease(gemD);
	audio4.currentTime = 0;
	audio4.play();
});


//increases gem count and updates count in document, then checks for win//

function gemIncrease (gem) {
	gameCount += gem;
	$("#gameCount").html(gameCount);
	winCheck();

}


//Checks if player wins or loses//

function winCheck(){
	if(startingNumber === gameCount){
		wins++;
		audioWin.play();
		resetGame();
		
	} else if(gameCount > startingNumber){
		
		losses++;
		audioLose.play();
		resetGame();
		
}
};



//Generates a random number in a range//

function randomNumber(lowerNum, upperNum) {
	return Math.floor(Math.random()*(upperNum - lowerNum + 1)) + lowerNum;	
};



//generates a random number between 1 and 19 without having two gems with the same number//
//variables/array not accessible outside of function's scope//

function gemFunction (){
	var num = Math.floor(Math.random() * gemArray.length); //picks a random number in array
	var pull = gemArray.splice(num, 1); //pulls that number and puts it in new array
	return pull[0]; //uses the above number (index 0 because eventually the array will grow to 3 numbers)
};




//resets the game on win or loss//

function resetGame(){
gameCount = 0;
gemArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
gemA = gemFunction();
gemB = gemFunction();
gemC = gemFunction();
gemD = gemFunction();

startingNumber = randomNumber(19, 120);
$("#gameCount").html(gameCount);
$("#startingNumber").html(startingNumber);
$("#wins").html("Wins: " + wins);
$("#losses").html("Losses: " + losses);

};





}); //end of document ready function
