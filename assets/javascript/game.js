$(document).ready(function() {
	var myChar;
	var opponentChar;

	var choices = [];
	var enemyArray = [ {
		id: 0,
		name: "Hufflepuff",
		pic: 'assets/images/hufflepuff.jpg',
		hitPoints: 20,
		attackPower: 5
	}, {
		id: 1,
		name: "Gryffindor",
		pic: 'assets/images/gryffindor.png',
		hitPoints: 120,
		attackPower: 10 		
	}, {
		id: 2,
		name: "Slytherin",
		pic: 'assets/images/slytherin.png',
		hitPoints: 125,
		attackPower: 9 
	}, {
		id: 3,
		name: "Ravenclaw",
		pic: 'assets/images/ravenclaw.png',
		hitPoints: 100,
		attackPower: 7 
	} ];

	var haveCharacter = false;	//If you've picked your character or not
	var haveAttacker = false;	//If you have an opponent or not
	var numEnemies = 3;


	for(var i = 0; i < enemyArray.length; i++) {
		choices += "<div id=" + enemyArray[i].id + " class='btn character text-center' value=" + enemyArray[i].id +
		"><img class='houses' src=" + enemyArray[i].pic + " alt=" + enemyArray[i].name + "><br> " + enemyArray[i].hitPoints +
		"<br> " + enemyArray[i].attackPower + " </div>";
	}

	$("#picking").html(choices);
	attachCharacterOnClick();

	function restart() {		//Restarts all of the values
		myChar;
		opponentChar;

		choices = [];
		enemyArray = [ {
			id: 0,
			name: "Hufflepuff",
			pic: 'assets/images/hufflepuff.jpg',
			hitPoints: 20,
			attackPower: 5
		}, {
			id: 1,
			name: "Gryffindor",
			pic: 'assets/images/gryffindor.png',
			hitPoints: 120,
			attackPower: 10 		
		}, {
			id: 2,
			name: "Slytherin",
			pic: 'assets/images/slytherin.png',
			hitPoints: 125,
			attackPower: 9 
		}, {
			id: 3,
			name: "Ravenclaw",
			pic: 'assets/images/ravenclaw.png',
			hitPoints: 100,
			attackPower: 7 
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
		$('.hero').remove();
		$('.fighting').remove();
		attachCharacterOnClick();
	}

	function printCharacters(enemyArray, myChar, opponentChar) {
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
			}
			else if(!haveAttacker && haveCharacter) {	//You have a character and you're picking your opponent
				opponentChar = $(this).attr('id');
				$("#enemy").append(this);
				$(this).addClass("fighting");

				haveAttacker = true;
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
			enemyArray[myChar].attackPower = enemyArray[myChar].attackPower + 5;	//Get Stronger


			if(enemyArray[opponentChar].hitPoints < 0) {
				numEnemies--;
				if(numEnemies > 0) {
					$(".fighting").remove();
					alert("You have defeated your foe! Pick another enemy!");
					haveAttacker = false;
				}
				else {
					alert("You have beat all the enemies!  Play again!");
					restart();
				}
				
			}
			else if(enemyArray[myChar].hitPoints < 0) {
				alert("You have been defeated!  Try again!");
				restart();
			}
			else {
				printCharacters(enemyArray, myChar, opponentChar);
			}

		}
	});

	$('#restart').on("click", function(){
		restart();
	});


});