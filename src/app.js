 import { createDeckElement } from '../dom.js';
import { faces, suits, colors, Stock, Waste, Foundation, Pile,} from './cards.js'
 import { createDeck, dealDeck, shuffleDeck } from './util.js';
 
const zones = {
   stock: document.getElementById('stock'),
   foundations: document.getElementById('foundation'),
   piles: document.getElementById('piles')

}

 start()
 
 function start() {

const deck = createDeck()
shuffleDeck(deck)
shuffleDeck(deck)
shuffleDeck(deck)
shuffleDeck(deck)

console.log(deck);

const {index, state} = dealDeck(deck);

console.log(index, state);

stateToBoard(state)
 }
 

    /** @param {import('./util.js').GameState} state */
 function stateToBoard(state){
   zones.stock.replaceChildren(
      createDeckElement(state.stock),
      createDeckElement(state.waste)
   )
 }
