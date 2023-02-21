 import { faces, suits, colors, Stock, Waste, Foundation, Pile } from './cards.js'
 
 start()
 
 function start() {
    const state = {
        stock: new Stock(),
        waste: new Waste(),
        foundations: {
            [suits.Clubs]: new Foundation([], suits.Clubs),
            [suits.Diamonds]: new Foundation([], suits.Diamonds),
            [suits.Spades]: new Foundation([], suits.Spades),
            [suits.Hearts]: new Foundation([], suits.Hearts),
        },
        piles: [
            new Pile(),
            new Pile(),
            new Pile(),
            new Pile(),
            new Pile(),
            new Pile(),
            new Pile(),
        ] 
    }

    console.log(state);

    const deck = createDeck()
    console.log(deck)

 }