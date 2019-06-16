const cards = document.querySelectorAll('.card');

let secondFlip = false;
let lockBoard = false;
let firstCard, secondCard;
let scores = [0,0];
let activePlayer = 0;

function flipCard() {
    //if the cards are flipping back over, don't allow another click 
    if (lockBoard) return;

    //if the first card is clicked again, don't do anything
    if (this === firstCard) return; 

    //if neither of the above are true, flip card over
    this.classList.add('flip');

    //if a card hasn't already been turned over, this is first turn
    if (!secondFlip) {
        //since this is the first card flipped, update game state
        //so that the next card will be the second card flipped
        secondFlip = true;
        //update game state to record card flipped as first card
        firstCard = this;

    } else {
        //if it's not the first card flipped, record as second card flipped
        secondCard = this;
        checkForMatch();
        checkForWin();
    }
}

function checkForMatch() {
    //if the dataset matches on both cards, remove event listener to prevent cards from being clicked again
    let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

    //if the cards match, keep them flipped, if they don't, flip back over
    if (isMatch) {
        updateMatchColor();
        disableCards(); 
        updateScore();
        setTimeout(() => {
            updateScoreboard();
        }, 500);
    } else {
        unflipCards();
        setTimeout(() => {
            nextPlayer();
        }, 1500);
    }
}

function updateMatchColor() {
    let firstMatch = firstCard;
    let secondMatch = secondCard;
    if (activePlayer === 0) {
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

function checkForWin() {
    if (scores[0] + scores[1] == 8) {
        setTimeout(() => {
            updateWinner();
        }, 1000);
    }
}

function updateWinner() {
    if (scores[0] > scores[1]) {
        document.querySelector('.winner').textContent = 'Blue Player is victorious!';
    } else if (scores[0] < scores[1]) {
        document.querySelector('.winner').textContent = 'Red Player is victorious!';
    } else {
        document.querySelector('.winner').textContent = 'It is a tie. Try again!';
    }
}

function updateScore() {
    scores[activePlayer] = scores[activePlayer] + 1;
}

function updateScoreboard() {
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
}

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

//if the cards are a match, then remove the click listener and the flip card function
//so that they can't be clicked again
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetTurn();
}

function unflipCards() {
    //prevents new cards from being clicked while current cards are flipping back over
    lockBoard = true;

    //gives time to view cards that aren't a match before flipping back over
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetTurn();
    }, 1500);
}

//resets game state for next turn
function resetTurn() {
    secondFlip = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        //want to assign each card an integer between 0-11, use random to randomize, use floor to create integer from random number (order property needs integer)
        card.style.order = randomPos;
        console.log(randomPos);
    });
}

function resetGame() {
    secondFlip = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    scores = [0,0];
    activePlayer = 0;

    cards.forEach(card => console.log(card));
    cards.forEach(card => card.addEventListener('click', flipCard));
    cards.forEach(card => card.classList.remove('flip'));

    lockBoard = true;
    setTimeout(() => {
        shuffleCards();
        lockBoard = false;
    }, 1000);

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
}

//Immediately invoked functon expression 
(function startGame() {
    resetGame();
    document.getElementById('new-game').addEventListener('click', resetGame);
})();