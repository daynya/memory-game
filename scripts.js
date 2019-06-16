/**
 * JavaScript Memory Game
 *  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Rules:
    Alternating turns between a red and a blue player.
    Ability to start a new game.
    At the end of the game declare a winner.
    Follow Game Rules.
        Mix up the cards.
        Lay them in rows, face down.
        Turn over any two cards.
        If the two cards match, keep them.
        If they don't match, turn them back over.
        Remember what was on each card and where it was.
        Watch and remember during the other player's turn.
        The game is over when all the cards have been matched.
        The player with the most matches wins.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

const cards = document.querySelectorAll('.card');

let secondFlip = false;
let lockBoard = false;
let firstCard, secondCard;
let scores = [0,0];
let activePlayer = 0;

/**
 * flipCard is a function that is called every time a card is clicked.
 * It designates the first and second cards, and prevents further cards
 * from being clicked during the turn (via lockBoard).
 */
function flipCard() {
    // If the cards are flipping back over, don't allow another click.
    if (lockBoard) return;

    // If the first card is clicked a second time, don't do anything.
    if (this === firstCard) return; 

    // If neither of the above are true, flip card over.
    this.classList.add('flip');

    // If a card hasn't already been turned over, this is first card.
    if (!secondFlip) {
        // Since this is the first card flipped, update game state
        // so that the next card will be the second card flipped.
        secondFlip = true;
        // Update game state to record card flipped as first card.
        firstCard = this;

    } else {
        // If it's not the first card flipped, record as second card 
        // flipped, check for a match and a win.
        secondCard = this;
        checkForMatch();
        checkForWin();
    }
}

/**
 * checkForMatch tests both flipped cards' datasets to see if they are 
 * the same (a match). If they are, they will stay flipped and be 
 * unclickable. The player gets a point, and the cards turn the player's 
 * color.
 */
function checkForMatch() {
    let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

    // If the cards match, keep them flipped, if they don't, flip back
    // over. If the dataset matches on both cards, remove event listener 
    // to prevent cards from being clicked again

    if (isMatch) {
        updateMatchColor();
        disableCards(); 
        updateScore();

        // The first Timeout function here is to allow the scoreboard to 
        // be updated before updating whose turn it is next. 
        setTimeout(() => {
            updateScoreboard();
        }, 500);
    } else {
        unflipCards();

        //The second Timeout here is to allow the cards to finish 
        // flippingback over before changing players.
        setTimeout(() => {
            nextPlayer();
        }, 1500);
    }
}

/**
 * updateMatchColor sets the color of the flipped cards to reflect the 
 * player who made the match.
 */
function updateMatchColor() {
    // firstMatch and secondMatch are set to hold the values of firstCard
    // and secondCard for the Timeout functions, because resetTurn is 
    // called before the Timeout executes.
    let firstMatch = firstCard;
    let secondMatch = secondCard;
    if (activePlayer === 0) {
        // The Timeout function here is to allow the second card to 
        // finish displaying before changing color.
        setTimeout(() => {
            firstMatch.classList.add('blue');
            secondMatch.classList.add('blue');
        }, 1000);
    } else {
        setTimeout(() => {
            firstMatch.classList.add('red');
            secondMatch.classList.add('red');
        }, 1000);
    }
}

/**
 * checkForWin compares the players scores to see who had more matches, 
 * once all 8 pairs are matched. 
 */
function checkForWin() {
    if (scores[0] + scores[1] == 8) {
        // The Timeout function here is to allow the cards to finish
        // flipping and updating color before showing the winner.
        setTimeout(() => {
            updateWinner();
        }, 1000);
    }
}

/**
 * updateWinner swaps the visibility of the scoreboard for the winner 
 * panel. The style and content are populated based on who won the game.
 */
function updateWinner() {
    if (scores[0] > scores[1]) {
        document.getElementById('scoreboard').style.display = 'none';
        document.getElementById('winner-alert').style.display = 'block';
        document.getElementById('winner-alert').style.color = '#044497';
        document.getElementById('winner-alert').textContent = 'BLUE WINS!';
    } else if (scores[0] < scores[1]) {
        document.getElementById('scoreboard').style.display = 'none';
        document.getElementById('winner-alert').style.display = 'block';
        document.getElementById('winner-alert').style.color = 'red';
        document.getElementById('winner-alert').textContent = 'RED WINS!';
    } else {
        document.getElementById('scoreboard').style.display = 'none';
        document.getElementById('winner-alert').style.display = 'block';
        document.getElementById('winner-alert').textContent = 'TIE GAME, TRY AGAIN!';
    }

    // The Timeout function here is to allow the message to post briefly
    // before resetting the game.
    setTimeout(() => {
        resetGame();
    }, 1500);
}

/**
 * updateScore adds a point to the active player (called only when
 * there is a match).
 */
function updateScore() {
    scores[activePlayer] = scores[activePlayer] + 1;
}

/**
 * updateScoreboard populates the scoreboard with the point from 
 * updateScore.
 */
function updateScoreboard() {
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
}

/**
 * nextPlayer switches the active player status to the other player
 * (called when there is no match).
 */
function nextPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    } else {
        activePlayer = 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    }
}

/**
 * disableCards removes the click listener, so that these matched cards
 * cannot be clicked again. The cards are reset for the next turn.
 */
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetTurn();
}

/**
 * unflipCards flips the cards back over when they are not a match.
 * lockBoard is used to prevent clicking while the cards turn over.
 */
function unflipCards() {
    lockBoard = true;

    // The Timeout function here is to allow the second card to finish 
    // displaying before flipping back over.
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetTurn();
    }, 1500);
}

/**
 * resetTurn clears the classes from the cards that aren't matches, 
 * and allows a new first card to be clicked (lockBoard is released).
 */
function resetTurn() {
    secondFlip = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

/**
 * shuffleCards randomizes the order of the elements in the cards array
 * by generating a random number between 1 and 16 (no. of cards), and 
 * then applying it to the "order" style on the cards to mix up their 
 * order in the array.
 * */
function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
}

/**
 * resetGame clears the classes from the cards, resets the scores, 
 * and unlocks the cards for play.
 */
function resetGame() {
    secondFlip = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    scores = [0,0];
    activePlayer = 0;

    cards.forEach(card => card.addEventListener('click', flipCard));
    cards.forEach(card => card.classList.remove('flip'));
    
    cards.forEach(card => card.classList.remove('blue'));
    cards.forEach(card => card.classList.remove('red'));

    lockBoard = true;
    
    // The Timeout function here is to allow the cards to finish flipping
    // over before shuffling.
    setTimeout(() => {
        shuffleCards();
        lockBoard = false;
    }, 1000);

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('scoreboard').style.display = '';
    document.getElementById('winner-alert').style.display = 'none';
}

/**
 * startGame resets the game upon page load.
 */
(function startGame() {
    resetGame();

    // this adds an event listener to 'new-game', that when clicked,
    // will reset the game. 
    document.getElementById('new-game').addEventListener('click', resetGame);
})(); 