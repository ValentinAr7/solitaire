import { colors } from './cards';

const suits = {
    clubs: '&clubs',
    diamonds: '&diams',
    hearts: '&hearts',
    spades: '&spades'
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

/** @param {import ('./cards.js').Deck} deck */
export function createDeckElement(deck) {
    const element = document.createElement('article');
    element.className = 'deck'

    for(let i = 0; i < deck.size; i++){
        const card = deck.cards[i]
        const top = i == deck.topIndex;
        element.appendChild(createCard(card, top))
    }
}


/** @param {import ('./cards.js').Card} card */
/** @param {boolean} top */

function createCard(card, top) {
    const element = document.createElement('div');
    element.classList.add('card')

    let content = ''

    if (card.faceUp) {
        element.classList.add(colors[card.suit])
        content = `${suits[card.suit]}${faces[card.face]}`  
    } else {
        content = `<span class="back"></span>`
    }

    if (top) {
        element.classList.add('top');
    }
    element.innerHTML = content

    return element 
}