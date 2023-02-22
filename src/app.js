import { createDeckElement } from './dom.js';
import { createDeck, dealDeck, shuffleDeck } from './util.js';

const zones = {
   stock: document.getElementById('stock'),
   foundations: document.getElementById('foundation'),
   piles: document.getElementById('pile')
}

/** @type {import('./util.js').GameState} deck */
let state = null

/** @type {import('./cards.js').Deck[]} deck */
let index = []

document.getElementById('board').addEventListener('click', onClick)

start()

function start() {

   const deck = createDeck()
   shuffleDeck(deck)
   shuffleDeck(deck)
   shuffleDeck(deck)
   shuffleDeck(deck)
   console.log(deck);

   [index, state] = dealDeck(deck);
   console.log(index, state);

   index.forEach(deck => deck.moves = getMoves(deck));

   stateToBoard(state)
}


/** @param {import('./cards').Deck} deck */
/** @param {import('./cards').Deck | import('./cards'.Card[] | null)} cards*/

function getMoves(deck, cards) {
   return {
      flip: !cards && deck.canFlip(),
      take: !cards && deck.cards.map((_, i) => deck.canTake(i)).map((v, i) => v && i).filter(v => v !== false),    //returns an array with card index that we can take
      place: cards && deck.canPlace(cards)
   };
}


/** @param {import('./util.js').GameState} state */
function stateToBoard(state) {
   zones.stock.replaceChildren(
      createDeckElement(state.stock),
      createDeckElement(state.waste)
   )
   zones.foundations.replaceChildren(...Object.values(state.foundations).map(createDeckElement))
   zones.piles.replaceChildren(...state.piles.map(createDeckElement))
}

function onClick(event) {        //on click event 
   let deck = null;
   if (event.target.classList.contains('deck')) {
      deck = event.target
   } else if (event.target.classList.contains('card')) {
      deck = event.target.parentElement
   }
   else if (event.target.classList.contains('back')) {
      deck = event.target.parentElement.parentElement
   }

   if (deck != null) {
      const type = deck.dataset.type
      let suit = '';
      let index = -1;

      if (type == 'foundation') {
         suit = deck.dataset.suit
      } else if (type == 'pile') {
         index = Number(deck.dataset.index)
      }

      if (type == 'stock') {
         flipStock();
      } else if(type == 'pile'){
         flipPile(index)
      }

      stateToBoard(state)
   }
}

function flipStock() {
   if(state.stock.size == 0){
      const cards = [...state.waste.cards];
      state.waste.cards.length = 0;
      cards.reverse();
      cards.forEach(c => c.faceUp = false)
      state.stock.cards.push(...cards)
   } else {
      state.stock.flip()
      const card = state.stock.cards.pop()
      state.waste.cards.push(card)
   }
}

function flipPile(index){
   state.piles[index].flip();
}



