
//Array of words (all lowercase)
var gamesList = ["rainbow six siege", "mario kart", "counter strike", "l o z ocarina of time", "the sims","super mario world", "street fighter", "doom", "pokemon", "star fox", "metal gear solid", "fortnite"];

//Computer selected solution will be here
var chosenWord = '';


// will break the solution in to individual letters to be storec in array
var lettersInChosenWord= [];

//number of blanks we show based on the solution
var numBlanks = 0;    

// holds a mix of blanks and solved letters
var blanksAndSuccesses = [];

// holds all the wrong guesses 
var wrongGuesses = [];

// holds all the letters guessed 
var letterGuessed = '';

//GameCounter
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;

// this is how we 
function startGame() {

	// resets the guesses back to zero
	numGuesses = 9;

	// Solution randomly from word list
	chosenWord = gamesList[Math.floor(Math.random() * gamesList.length)];

	// breaks the word into individual letters
	lettersInChosenWord = chosenWord.split("");

	// counts the number of letters in the word
	numBlanks = lettersInChosenWord.length;

	// here we print the solution in the console (for testing purposes)
	console.log(chosenWord);

	// here we reset the guess and success array at each round
	blanksAndSuccesses = [];

	// here we reset the wrong guesses from the previous round
	wrongGuesses = [];

	// here we fill up the blanksAndSuccesses list with the appropriate number of blanks
	// which is based on the number of letters
	for (var i = 0; i < numBlanks; i++) {
		blanksAndSuccesses.push("_");
	} 

	// print the initial blanks in the console
	console.log(blanksAndSuccesses);

	// reprints the gueeses left in the console 
	document.getElementById("guesses-left").innerHTML = numGuesses;

	// prints the blanks at the begining of each round in the HTML
	document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

	// clears wrong guesses from previous round
	document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

}

function checkLetters(letter) {
	var letterInWord = false;

	for (var i=0; i < numBlanks; i++) {
		if (chosenWord[i] === letter) {
			letterInWord = true;
		}
	}


	if (letterInWord) {
		for (var j=0; j < numBlanks; j++) {
			if (chosenWord[j] === letter) {
				blanksAndSuccesses[j] = letter;
			}
		}
		console.log(blanksAndSuccesses);
	} 

	else {
		wrongGuesses.push(letter);
		numGuesses--;
	}
}

function roundComplete() {
	console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + 
		" | NumGuesses: " + numGuesses);

	document.getElementById("guesses-left").innerHTML = numGuesses;
	document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

	if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
		winCounter++;
		alert("You win!");

		document.getElementById("win-counter").innerHTML = winCounter;

		startGame();
	}

	else if (numGuesses === 0) {
		lossCounter++;
		alert("You lose");

		document.getElementById("loss-counter").innerHTML = lossCounter;

		startGame();
	}
}

startGame();

document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();
};