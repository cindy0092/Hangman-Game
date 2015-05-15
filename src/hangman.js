//declare a global 
var globalWord;
var inputCounter = [];
var counter = 0;

function RandomWord() {
	var requestStr = "http://randomword.setgetgo.com/get.php";

    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "jsonp",
        jsonpCallback: 'RandomWordComplete'
    });
	// var words = [
	// "apple", "orange", "watermelon", "lemon", "pear", "strawberry",
	//  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
	// "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
	// "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
	// "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
	// "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
	// "New Hampshire", "New Jersey", "New Mexico", "New York", 
	// "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
	// "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
	// "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
	// "West Virginia", "Wisconsin", "Wyoming"
	// ];
	// return words[Math.floor(Math.random() * words.length)];
}
// var RandomWordAssign = function(data)
// {
// 	globalWord = data.Word;
// 	console.log(globalWord);
// }

//___________________taking care of the random word_______________________________
function RandomWordComplete(data) 
{
	var generatedWords = document.getElementById("generatedWords");
	console.log(data.Word);
	globalWord = data.Word.split("");
	globalWord.splice(-2);
	_.each(globalWord, function(item)
	{
		if(item === " ")
		{
			inputCounter.push(1);
			$(generatedWords).append("-");
		}
		else
		{
			inputCounter.push(0);
			$(generatedWords).append("_"+" ");
		}
	});
}
// var word = RandomWord().toLowerCase();
$(document).ready(function() {
	RandomWord();
	//console.log(globalWord);
//_____________declar variable____________________________________________
	var $input, $incorrectArea;
//_______________making sure all the input are letters____________________

	//only allow one letter in the input box
    $("#letterBox").keypress(function(event)
    {
        var inputValue = event.charCode;
        if((inputValue > 47 && inputValue < 58) && (inputValue != 32))
        {
            event.preventDefault();
        }
    });

	//________________console log the input val______________________________________
	$('form input[type="text"]').on('blur', function()
	{
		console.log(this.value);
	});

	//____________________invoke a function when submit was clicked___________________

		$('#hangman').on("submit", function(e){
			e.preventDefault();
	   		$input = $('#letterBox').val();
	   		if($input === $input.toUpperCase()){
	   			$input = $input.toLowerCase();
	   		}
	   		$("#hangman").trigger("reset");
	   		checkInput($input, globalWord);
		});
//___________________checking if the input is correct________________________________
	
	function checkInput(userInput, word){
		$incorrectArea = $("#incorrectArea");
		if(_.contains(word, userInput))
		{ //if input is correct
			$(generatedWords).empty();
	   			_.each(word, function(item, index)
	   			{
	   				if (item === userInput)
	   				{
	   					inputCounter[index] = 1;
	   				}
	   				if(inputCounter[index] === 1)
	   				{
	   					$(generatedWords).append(item);
	   				}
	   				else
	   				{
	   					if(item === " ")
	   					{
	   						$(generatedWords).append("-");
	   					}
	   					else
	   					{
	   						$(generatedWords).append("_"+" ")
	   					}
	   				}
	   			});
	   	}
	   	else
	   	{ //if input incorrect
	   		$(incorrectArea).append(userInput);
	   		counter += 1;
	   	}
	   	winOrLose(inputCounter, counter);
	}
//___________counting the user's lives_______________________________________
	function winOrLose(Arrcounter, lifeCounter){
		if(lifeCounter === 6){
			alert("you lose");
			counter = 0;
			inputCounter = [];
		}
		else if(_.every(Arrcounter)){
			alert("you win");
			counter = 0;
			inputCounter = [];			
		}
	}
	// RandomWordComplete(word);//passing the generated word
});








