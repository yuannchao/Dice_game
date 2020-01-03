/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying , winningScore;
var diceDisplay = document.querySelector('#dice-1') ;
var diceDisplay2 = document.querySelector('#dice-2') ;

init();

var lastDice ; 

var rolldicebtn = document.querySelector('.btn-roll') ;
rolldicebtn.addEventListener('click' , function(){
    if(gamePlaying){
        // random number
        var dice1 = Math.floor((Math.random() * 6) + 1) ;
        var dice2 = Math.floor((Math.random() * 6) + 1) ;

        // display the dice and number 
        diceDisplay.style.display = 'block' ; 
        diceDisplay2.style.display = 'block' ; 
        diceDisplay.src = 'img/dice-' + dice1 + '.png' ;
        diceDisplay2.src = 'img/dice-' + dice2 + '.png' ;

        if (dice1 > 1 && dice2 > 1) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Change player
            changePlayer();
        }   

        // if (dice === 6 && lastDice === 6){
        //     scores[activePlayer] = 0 ;
        //     document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //     changePlayer();
        // } else if (dice > 1) {
        //     //Add score
        //     roundScore += dice;
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
        // } else {
        //     //Change player
        //     changePlayer();
        // }   

        // lastDice = dice
    }
});


var holdbtn = document.querySelector('.btn-hold')
holdbtn.addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            diceDisplay.style.display = 'none';
            diceDisplay2.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            changePlayer();
        }
    }
});


function init(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    winningScore  = 100;
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

var newbtn = document.querySelector('.btn-new')
newbtn.addEventListener('click' , init)


function changePlayer() {
    //change player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceDisplay.style.display = 'none';
    diceDisplay2.style.display = 'none';
}


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

// 1. rolls two 6 



// 2. add winning score
var numinput = document.querySelector('.final-score')
numinput.addEventListener("input" , function(){
    init();
    winningScore = Number(numinput.value);
})
