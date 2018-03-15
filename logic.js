var gamesList = ["rainbow six siege", "mario kart", "counter strike"];

var chosenWord = '';

var letterInChosenWord = [];

var numBlanks = 0;

var blanksAndSuccesses = [];

var wrongGuesses = []

var letterGuessed = '';


var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;








function startGame(	) {

	numGuesses = 9;

	ChosenWord = gamesList[Math.floor (Math.random() * gamesList.length)]
  
	letterInChosenWord = chosenWord.split('');

	numBlanks = letterInChosenWord.length;

	console.log(chosenWord);




}


