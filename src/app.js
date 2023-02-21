 import { faces, suits, colors, Stock, Waste, Foundation, Pile,} from './cards.js'
 import { createDeck, dealDeck, shuffleDeck } from './util.js';
 
 start()
 
 function start() {

const deck = createDeck()
shuffleDeck(deck)
shuffleDeck(deck)
shuffleDeck(deck)
shuffleDeck(deck)

console.log(deck);

const {index, state} = dealDeck(deck);

console.log({index, state});

 }
 

    /** @param {import('./util.js').GameState} state */
 function stateToBoard(state){

 }
