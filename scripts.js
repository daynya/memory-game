const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let fistCard, secondCard;

function flipCard() {
    if (lockBoard)
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
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }, 1500);
}

cards.forEach(card => card.addEventListener('click', flipCard));