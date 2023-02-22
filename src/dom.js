import { colors, Foundation, Pile, Stock, Waste } from './cards.js';

const suits = {
    clubs: '&clubs;',
    diamonds: '&diams;',
    hearts: '&hearts;',
    spades: '&spades;'
}

const faces = {
    1: 'A',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    11: 'J',
    12: 'Q',
    13: 'K',
}; 

/** @param {GameDeck} deck */
export function createDeckElement(deck, index) {
    const element = document.createElement('article');
    element.className = 'deck'

    if(deck.moves.flip || deck.moves.place || deck.moves.take.length > 0){
        element.classList.add('active');
    }

    if(deck instanceof Stock){
        element.dataset.type = 'stock'
    } else if(deck instanceof Waste){
        element.dataset.type = 'waste'
    } else if(deck instanceof Foundation){
        element.dataset.type = 'foundation'
    } else if (deck instanceof Pile){
        element.dataset.type = 'pile'
        element.dataset.index = index
    }

    let cards = deck.cards

    if(deck.size > 1 && (deck instanceof Stock || deck instanceof Waste || deck instanceof Foundation)){
        const visibleCount = Math.ceil((deck.size - 1) / 5);
        cards = new Array(visibleCount);
        cards.fill({faceUp: false});
        cards.push(deck.top)
    }

    for(let i = 0; i < cards.length; i++){
        const card = cards[i]
        const top = i == cards.length - 1;
        element.appendChild(createCard(card, top))
    }

    return element
}


/** @param {import ('./cards.js').Card} card */
/** @param {boolean} top */

function createCard(card, top) {
    const element = document.createElement('div');
    element.classList.add('card')

    let content = '';

    if (card.faceUp) {
        element.classList.add(colors[card.suit])
        content = `${suits[card.suit]}${faces[card.face]}`  
    } else {
        content = `<span class="back${top ? 'top' : ''}"></span>`  
    }

    if (top) {
        element.classList.add('top');
    }
    element.innerHTML = content

    return element 
}

/** @typedef {import('./cards.js').Deck & {moves: {flip: boolean, take: number[], place: boolean}}} GameDeck */
