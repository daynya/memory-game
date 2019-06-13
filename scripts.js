const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let fistCard, secondCard;

function flipCard() {
    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;

        console.log({hasFlippedCard, firstCard});
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));