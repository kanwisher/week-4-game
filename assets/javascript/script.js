//waits until page is ready before starting manipulation//

window.onload = function () {
	
	let gems = {
		A: {
			value: 0,
			audio: new Audio("assets/sounds/gem1.mp3")
		},
		B: {
			value: 0,
			audio: new Audio("assets/sounds/gem2.mp3")
		},
		C: {
			value: 0,
			audio: new Audio("assets/sounds/gem3.mp3")
		},
		D: {
			value: 0,
			audio: new Audio("assets/sounds/gem4.mp3")
		}
	}

	let wins = 0;
	let losses = 0;
	let pickGemValue;
	const audioLose = new Audio("assets/sounds/lose.wav");
	const audioWin = new Audio("assets/sounds/win.mp3");


	//generates game//
	function startGame(){
		assignGemValues();
		updateScoreboard();
	};

	function updateScoreboard(){
		$$("#gameCount").textContent = 0;
		$$("#startingNumber").textContent = randomNumber(19, 120);
		$$("#wins").textContent = `Wins: ${wins}`;
		$$("#losses").textContent = `Losses: ${losses}`;
	}

	//on click function//
	function attachListeners(){
		$$("#button").addEventListener("click", (e) => {
			$$("#modal").style.display = "none"			
		});

		$$(".gem").forEach(gem => {
			gem.addEventListener("click", (e) => {
				const attr = e.currentTarget.getAttribute('data-title');
				gemIncrease(gems[attr])
			});
		});
	}

	//increases gem count and updates count in document, then checks for win//
	function gemIncrease (gem) {
		gameCount += gem.value;
		$$("#gameCount").textContent = gameCount;
		gem.audio.currentTime = 0;
		gem.audio.play();
		winCheck();
	}

	//Checks if player wins or loses//
	function winCheck(){
		if(gameCount === targetNumber){
			wins++;
			audioWin.play();
			startGame();
			
		} else if(gameCount > targetNumber){		
			losses++;
			audioLose.play();
			startGame();			
		}
	};

	//generates a random number between 1 and 19 without having two gems with the same number (closure)
	function gemRand(){
		const gemArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
		return function(){
			const num = randomNumber(0, gemArray.length - 1); //picks a random number in array
			const pull = gemArray.splice(num, 1); //splice pulls this number out of original array so that it cannot be chosen again
			console.log(pull);
			return pull[0]; //note that splice returns an array, so return first index
		}
	};

	function assignGemValues(){
		const pickGemValue = gemRand();
		for(let prop in gems){
			gems[prop].value = pickGemValue();
		}
	}

	//Generates a random number in a range//
	function randomNumber(lowerNum, upperNum) {
		return Math.floor(Math.random()*(upperNum - lowerNum + 1)) + lowerNum;	
	};

	//sorta pretends to be jQuery
	function $$(el){ 
		const elementName = el.slice(1);
		if(el.charAt(0) === "#"){
			return document.getElementById(elementName);
		} else if(el.charAt(0) === ".") {
			return Array.from(document.getElementsByClassName(elementName));
		} else {
			throw Error(`Expecting an ID or class but instead got ${el}`);
		}
	}
	
	startGame();
	attachListeners(); //do once	

};


