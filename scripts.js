const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; 
    //if a card is clicked twice, it will remove the event listener. 
    //the this variable holds the first card, but the firstCard variable remains unset due to double click.
    //if it is the second card, and it matches the first card, then it will return from the function.
    this.classList.add('flip');

    if (!hasFlippedCard) {
        //if hasFlippedCard is false, this is the first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    } 
    
        //if hasFlippedCard is true, this is the second click
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
}

function checkForMatch() {
    //do the cards match?
    //if the dataset matches on both cards, remove event listener to prevent cards from being clicked again
    let isMatch = firstCard.dataset.animal === secondCard.dataset.animal;

    isMatch ? disableCards() : unflipCards();
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
    [hasFlippedCard, lockBoard] = [false, false];
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