import { suits, faces, Card } from "./cards.js";

export function createDeck() {

    const deck = [];

    for(let suit of Object.values(suits)){
        for (let face of Object.values(faces)) {
            deck.push(new Card (suit, face));
        }
    }

    return deck
}