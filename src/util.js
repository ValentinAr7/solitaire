import { faces, suits, colors, Stock, Waste, Foundation, Pile, Deck, Card } from "./cards.js";

export function createDeck() {

    const deck = new Deck();

    for (let suit of Object.values(suits)) {
        for (let face of Object.values(faces)) {
            deck.cards.push(new Card(suit, face));
        }
    }

    return deck
}

/** 
 * @param {Deck} deck 
 */

export function shuffleDeck(deck) {
    const stock = [];

    while (deck.size > 0) {
        const card = deck.cards.splice(Math.random() * deck.size | 0, 1)[0];
        stock.push(card)
    }

    deck.cards.push(...stock)
}

/** 
* @param {Deck} deck 
* @returns {GameState } 
*/

export function dealDeck() {

    const index = [
        new Stock(),
        new Waste(),
        new Foundation([], suits.Clubs),
        new Foundation([], suits.Diamonds),
        new Foundation([], suits.Spades),
        new Foundation([], suits.Hearts),
        new Pile(),
        new Pile(),
        new Pile(),
        new Pile(),
        new Pile(),
        new Pile(),
        new Pile(),
    ]

    const state = {
        stock: index[0],
        waste: index[1],
        foundations: {
            [suits.Clubs]: index[2],
            [suits.Diamonds]: index[3],
            [suits.Spades]: index[4],
            [suits.Hearts]: index[5],
        },
        piles: [
            index[6],
            index[7],
            index[8],
            index[9],
            index[10],
            index[11],
            index[12],
        ]
    }

    for (let i = 0; i < 7; i++) {
        const pile = state.piles[i];            //Create the 7 piles

        for (let j = 0; j <= i; j++) {
            pile.cards.push(deck.cards.pop())   //Take the top card and place it on the top of the pile
        }

        pile.top.faceUp = true                  //turn the top card facing up
    }

    state.stock.cards.push(...deck.cards)       //put the rest of the piles into the stock

    return {index, state}                             //return state
}

/**
 * @typedef {Object} GameState
 * @property {Stock} stock
 * @property {Waste} waste 
 * @property {Object} foundations
 * @property {Foundation} foundations.clubs 
 * @property {Foundation} foundations.diamonds
 * @property {Foundation} foundations.hearts 
 * @property {Foundation} foundations.spades
 * @property {Pile, Pile, Pile, Pile, Pile, Pile, Piles} piles 
 *  
 *  
 *  
 */