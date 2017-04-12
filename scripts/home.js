var box1 = "available";
var box2 = "available";
var box3 = "available";
var totalTrials = 0;
var totalWinsMontyHall = 0;
var totalWinsMontyFall = 0
var totalValidTrialsMontyFall = 0;
var startTime = new Date();
var endTime = new Date();
$(document).ready(function(){
	$("#run").click(function(){
		totalTrials = 0;
		totalWinsMontyHall = 0;
		totalWinsMontyFall = 0
		totalValidTrialsMontyFall = 0;
		var numberOfTrials = parseInt($("#number-of-trials").val());
		if(isNaN(numberOfTrials)){
			alert("ERROR: please enter integer values only!")
		}else{
			if(numberOfTrials > 0){
				startTime = new Date();
				totalTrials = numberOfTrials
				run(numberOfTrials);
				printData();
			}else{
				alert("ERROR: please enter a value greater than 0")
			}
		}
	})
	
})

function run(numberOfTrials){
	$("#monty-hall").empty();
	$("#monty-fall").empty();
//	var i = 0;
//	(function doSort() {
//	    // update progress
//		performOneRoundOfGameMontyHall()
//		performOneRoundOfGameMontyFall()
//	    i++;
//	    if (i < numberOfTrials) {
//	        setTimeout(doSort, 0);
//	    }
//	})();
	for (i = 0; i < numberOfTrials; i++){
		performOneRoundOfGameMontyHall()
		performOneRoundOfGameMontyFall()
		endTime = new Date();
	}
}

function performOneRoundOfGameMontyHall(){
	var availableBoxesForContestant = [1, 2, 3];
	var availableBoxesForMontyHall = [1, 2, 3];
	var prizeBox = Math.floor(Math.random() * 3) + 1 ;
	var contestantBox = Math.floor(Math.random() * 3) + 1 ;
	
	/* REMOVE CONTESTANT'S BOX FROM MONTY HALL'S (AND CONTESTANT'S) CHOICES*/
		var indexOfContestantBox = availableBoxesForContestant.indexOf(contestantBox);
		if (indexOfContestantBox > -1) {
			availableBoxesForContestant.splice(indexOfContestantBox, 1);
			availableBoxesForMontyHall.splice(indexOfContestantBox, 1);
		}else{
			alert("runtime error!")
		}
	/* REMOVE PRIZE BOX FROM MONTY HALL'S CHOICES*/
		var indexOfPrizeBox = availableBoxesForMontyHall.indexOf(prizeBox);
		var openedBoxMontyHall;
		if (indexOfPrizeBox > -1) {
			/* CONTESTANT DID NOT SELECT PRIZE BOX, SO MONTY HALL SHOULD NOT SELECT IT */
				availableBoxesForMontyHall.splice(indexOfPrizeBox, 1);
				openedBoxMontyHall = availableBoxesForMontyHall[0];
		}else{
			/* CONTESTANT SELECTED PRIZE BOX, SO MONTY CAN CHOOSE BETWEEN ANY OF THE REMAINING TWO BOXES */
				var indexOfOpenedBoxMontyHall = Math.floor(Math.random() * 2);
				openedBoxMontyHall = availableBoxesForMontyHall[indexOfOpenedBoxMontyHall];
		}
	/* REMOVE MONTY HALL'S BOX FROM CONTESTANT'S CHOICES*/
		var indexOfMontyHallOpenBox = availableBoxesForContestant.indexOf(openedBoxMontyHall);
		if (indexOfMontyHallOpenBox > -1) {
			availableBoxesForContestant.splice(indexOfMontyHallOpenBox, 1);
		}else{
			alert("runtime error!")
		}
	
	/* FORCE CONTESTANT TO SWITCH */
		var contestantBoxSwitched = availableBoxesForContestant[0];
		
	var didContestantWin = (contestantBoxSwitched == prizeBox)
	if(didContestantWin){
		totalWinsMontyHall += 1;
	}
	
	/* PRINT RESULTS ON PAGE */
		var montyHallEntry = $("#template").clone();
		montyHallEntry.removeAttr("id").removeClass("hidden");
		montyHallEntry.find("."+prizeBox).addClass("prizeBox");
		montyHallEntry.find("."+contestantBox).find(".number").addClass("contestantBox");
		montyHallEntry.find("."+openedBoxMontyHall).addClass("montyHallBox");
		montyHallEntry.find("."+contestantBoxSwitched).addClass("switchedBox");
		montyHallEntry.appendTo("#monty-hall");
		montyHallEntry.find(".win-lose-box").find(".win-lose-text").text(didContestantWin ? "WIN" : "LOSE").addClass(didContestantWin ? "win" : "lose");
	console.log("contestantBox: " + contestantBox + " | pirzeBox: " + prizeBox + " | openedBoxMontyHall: " + openedBoxMontyHall + " | contestantBoxSwitched: " + contestantBoxSwitched + " | " + (didContestantWin ? "WIN!" : "LOSE!"));
}

function performOneRoundOfGameMontyFall(){
	var availableBoxesForContestant = [1, 2, 3];
	var availableBoxesForMontyHall = [1, 2, 3];
	var prizeBox = Math.floor(Math.random() * 3) + 1 ;
	var contestantBox = Math.floor(Math.random() * 3) + 1 ;
	
	/* REMOVE CONTESTANT'S BOX FROM MONTY HALL'S (AND CONTESTANT'S) CHOICES*/
		var indexOfContestantBox = availableBoxesForContestant.indexOf(contestantBox);
		if (indexOfContestantBox > -1) {
			availableBoxesForContestant.splice(indexOfContestantBox, 1);
			availableBoxesForMontyHall.splice(indexOfContestantBox, 1);
		}else{
			alert("runtime error!")
		}
		
	/* MONTY CHOOSES FROM ANY OF THE TWO REMAINING BOXES*/
		var indexOfOpenedBoxMontyHall = Math.floor(Math.random() * 2);
		openedBoxMontyHall = availableBoxesForMontyHall[indexOfOpenedBoxMontyHall];
	
		if(openedBoxMontyHall != prizeBox){
			totalValidTrialsMontyFall += 1;
			/* REMOVE MONTY HALL'S BOX FROM CONTESTANT'S CHOICES*/
				var indexOfMontyHallOpenBox = availableBoxesForContestant.indexOf(openedBoxMontyHall);
				if (indexOfMontyHallOpenBox > -1) {
					/* CONTESTANT  */
					availableBoxesForContestant.splice(indexOfMontyHallOpenBox, 1);
				}else{
					alert("runtime error!")
				}
			
			/* FORCE CONTESTANT TO SWITCH */
				var contestantBoxSwitched = availableBoxesForContestant[0];
				
			var didContestantWin = (contestantBoxSwitched == prizeBox)
			if(didContestantWin){
				totalWinsMontyFall += 1;
			}
			
			/* PRINT RESULTS ON PAGE */
				var montyHallEntry = $("#template").clone();
				montyHallEntry.removeAttr("id").removeClass("hidden");
				montyHallEntry.find("."+prizeBox).addClass("prizeBox");
				montyHallEntry.find("."+contestantBox).find(".number").addClass("contestantBox");
				montyHallEntry.find("."+openedBoxMontyHall).addClass("montyHallBox");
				montyHallEntry.find("."+contestantBoxSwitched).addClass("switchedBox");
				montyHallEntry.appendTo("#monty-fall");
				montyHallEntry.find(".win-lose-box").find(".win-lose-text").text(didContestantWin ? "WIN" : "LOSE").addClass(didContestantWin ? "win" : "lose");
			console.log("contestantBox: " + contestantBox + " | pirzeBox: " + prizeBox + " | openedBoxMontyHall: " + openedBoxMontyHall + " | contestantBoxSwitched: " + contestantBoxSwitched + " | " + (didContestantWin ? "WIN!" : "LOSE!"));
		}else{
		/* PRINT RESULTS ON PAGE */
			var montyHallEntry = $("#template").clone();
			montyHallEntry.removeAttr("id").removeClass("hidden");
			montyHallEntry.find("."+prizeBox).addClass("prizeBox");
			montyHallEntry.find("."+contestantBox).find(".number").addClass("contestantBox");
			montyHallEntry.find("."+openedBoxMontyHall).addClass("montyHallBox");
			montyHallEntry.appendTo("#monty-fall");
			montyHallEntry.find(".win-lose-box").find(".win-lose-text").text("VOID").addClass("void");
		console.log("contestantBox: " + contestantBox + " | pirzeBox: " + prizeBox + " | openedBoxMontyHall: " + openedBoxMontyHall + " | VOID");
		}
		
	
}

function printData(){
	$("#monty-hall-wins").text(totalWinsMontyHall);
	$("#monty-hall-losses").text(totalTrials - totalWinsMontyHall);
	$("#monty-hall-wins-percentage").text((1.0*totalWinsMontyHall/(1.0*totalTrials))*100.00);
	
	$("#monty-fall-wins").text(totalWinsMontyFall);
	$("#monty-fall-losses").text(totalValidTrialsMontyFall - totalWinsMontyFall);
	$("#monty-fall-wins-percentage").text((1.0*totalWinsMontyFall/(1.0*totalValidTrialsMontyFall))*100.00);
	
	$("#total-time").text((endTime - startTime)*1.0/1000.0)
	$("#average-time").text((endTime - startTime)*1.0/(totalTrials*1000.0))
}