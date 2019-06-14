const cards = document.querySelectorAll('.card');

let secondFlip = false;
let lockBoard = false;
let firstCard, secondCard;

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
    }
}

function checkForMatch() {
    //do the cards match?
    //if the dataset matches on both cards, remove event listener to prevent cards from being clicked again
    let isMatch = firstCard.dataset.animal === secondCard.dataset.animal;

    isMatch ? disableCards() : unflipCards();
    console.log(isMatch);
}

    //if the datasets do not match, flip cards back to original state
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [secondFlip, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

}

(function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        //want to assign each card an integer between 0-11, use random to randomize, use floor to create integer from random number (order property needs integer)
        card.style.order = randomPos;
    });
})();
//Immediately invoked functon expression 

cards.forEach(card => card.addEventListener('click', flipCard));