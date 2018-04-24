
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
//Here is where we'll do all of the comparisons for matches
function checkLetters(letter) {
	// a boolean which will be toggled based on whether or not a userletter is found anywhere in the word
	var letterInWord = false;

	for (var i=0; i < numBlanks; i++) {
		if (chosenWord[i] === letter) {
			//If the letter exists then change this to true it will be used in the next step
			letterInWord = true;
		}
	}

	// if the letter exists somewhere in the word, then figure out exactly where (what index)
	if (letterInWord) {
		// loop throught the word
		for (var j=0; j < numBlanks; j++) {
			// Populate the blanksAndSuccesses with every instance of the letter 
			if (chosenWord[j] === letter) {
				//set specificic blank spaces to equal the correct letter when there is a match
				blanksAndSuccesses[j] = letter;
			}
		}
		// Log for testing purposes
		console.log(blanksAndSuccesses);
	} 

	// if the letter doesn't exist at all...
	else {
		// then we add the letter of the list of wrong letters
		wrongGuesses.push(letter);
		// We also subtract one of the guesses
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