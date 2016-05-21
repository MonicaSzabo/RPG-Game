$(document).ready(function() {
	var myChar, opponentChar, choices, enemyArray, haveCharacter, haveAttacker, numEnemies;	//Set Global Variables

	function varSet() {		//Sets all of the variable values
		myChar;
		opponentChar;

		choices = [];
		enemyArray = [ {
			id: 0,
			name: "Hufflepuff",
			pic: 'assets/images/hufflepuff.jpg',
			hitPoints: 110,
			attackPower: 5
		}, {
			id: 1,
			name: "Gryffindor",
			pic: 'assets/images/gryffindor.png',
			hitPoints: 180,
			attackPower: 25 		
		}, {
			id: 2,
			name: "Slytherin",
			pic: 'assets/images/slytherin.png',
			hitPoints: 150,
			attackPower: 20 
		}, {
			id: 3,
			name: "Ravenclaw",
			pic: 'assets/images/ravenclaw.png',
			hitPoints: 120,
			attackPower: 8 
		} ];

		haveCharacter = false;
		haveAttacker = false;
		numEnemies = 3;

		for(var i = 0; i < enemyArray.length; i++) {
			choices += "<div id=" + enemyArray[i].id + " class='btn character text-center' value=" + enemyArray[i].id +
			"><img class='houses' src=" + enemyArray[i].pic + " alt=" + enemyArray[i].name + "><br> " + enemyArray[i].hitPoints +
			"<br> " + enemyArray[i].attackPower + " </div>";
		}

		$("#picking").html(choices);
		$("#todo").html("Click to choose your house");

		$('.hero').remove();
		$('.fighting').remove();

		attachCharacterOnClick();
	}

	function printCharacters() {
		var hero = "<div id=" + enemyArray[myChar].id + " class='btn character text-center hero' value=" + enemyArray[myChar].id +
			"><img class='houses' src=" + enemyArray[myChar].pic + " alt=" + enemyArray[myChar].name + "><br> " + enemyArray[myChar].hitPoints +
			"<br> " + enemyArray[myChar].attackPower + " </div>";
		var badguy = "<div id=" + enemyArray[opponentChar].id + " class='btn character text-center fighting' value=" + enemyArray[opponentChar].id +
			"><img class='houses' src=" + enemyArray[opponentChar].pic + " alt=" + enemyArray[opponentChar].name + "><br> " + enemyArray[opponentChar].hitPoints +
			"<br> " + enemyArray[opponentChar].attackPower + " </div>";
		$('#myguy').html(hero);
		$('#enemy').html(badguy);
	}


	function attachCharacterOnClick() {
		$('.character').on("click", function(){
			if(!haveCharacter) {	//Picking your character
				myChar = $(this).attr('id');
				$("#myguy").append(this);
				$(this).addClass("hero");

				haveCharacter = true;
				$("#todo").html("Now choose your opponent!");
			}
			//You have a character and you're picking your opponent
			else if(!haveAttacker && haveCharacter && myChar !== $(this).attr('id')) {	
				opponentChar = $(this).attr('id');
				$("#enemy").append(this);
				$(this).addClass("fighting");

				haveAttacker = true;
				$("#todo").html("Now keep clicking attack to duel!");
			}
		});
	}

	$('#attack').on("click", function() {
		if(!haveCharacter) {
			alert("You need to pick your character first!")
		}
		else if(!haveAttacker) {
			alert("Pick who you are fighting!");
		}
		else if(haveCharacter && haveAttacker) {
			enemyArray[opponentChar].hitPoints  = enemyArray[opponentChar].hitPoints - enemyArray[myChar].attackPower;	//Hit Them
			enemyArray[myChar].hitPoints = enemyArray[myChar].hitPoints - enemyArray[opponentChar].attackPower;	//Get Hit
			enemyArray[myChar].attackPower = enemyArray[myChar].attackPower + 8;	//Get Stronger


			if(enemyArray[opponentChar].hitPoints < 0) {
				numEnemies--;
				if(numEnemies > 0) {
					$(".fighting").remove();
					alert("You have defeated your foe! Pick another enemy!");
					$("#todo").html("Who will you duel next?");
					haveAttacker = false;
				}
				else {
					alert("You win the house cup!  Play again!");
					varSet();
				}
				
			}
			else if(enemyArray[myChar].hitPoints < 0) {
				alert("Your house has been defeated!  Try again!");
				varSet();
			}
			else {
				printCharacters();
			}

		}
	});

	$('#restart').on("click", function(){
		varSet();
	});

	attachCharacterOnClick();
	varSet();

});