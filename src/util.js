import { suits, faces, Card, Deck } from "./cards.js";

export function createDeck() {

    const deck = [];

    for(let suit of Object.values(suits)){
        for (let face of Object.values(faces)) {
            deck.cards.push(new Card (suit, face));
        }
    }

    return deck
}

    /** @param {Deck} deck */

    export function shuffleDeck(deck){
        const stock = [];

        while(deck.size > 0){
            const card = deck.cards.splice(Math.random() * deck.size | 0, 1)[0];
            stock.push(card)
        }
        deck.cards.push(...stock)
    }
