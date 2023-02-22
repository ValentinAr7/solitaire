import { createDeckElement } from './dom.js';
import { createDeck, dealDeck, shuffleDeck } from './util.js';
import { Foundation, Waste } from './cards.js';


const zones = {
   stock: document.getElementById('stock'),
   foundations: document.getElementById('foundation'),
   piles: document.getElementById('pile')
}

/** @type {import('./util.js').GameState} deck */
let state = null

/** @type {import('./cards.js').Deck[]} deck */
let deckIndex = []
let currentMove = null;

document.getElementById('board').addEventListener('click', onClick)

start()

function start() {

   const deck = createDeck()
   shuffleDeck(deck)
   shuffleDeck(deck)
   shuffleDeck(deck)
   shuffleDeck(deck)
   console.log(deck);

   [deckIndex, state] = dealDeck(deck);

   deckIndex.forEach(deck => deck.moves = getMoves(deck));
   console.log(deckIndex, state);

   stateToBoard(state)
}


/** @param {import('./cards').Deck} deck */
/** @param {import('./cards').Deck | import('./cards'.Card[] | null)} cards*/

function getMoves(deck, cards) {
   if(cards && deck instanceof Foundation){
      
   }

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
   let card = null;

   if (event.target.classList.contains('deck')) {
      deck = event.target
   } else if (event.target.classList.contains('card')) {
      deck = event.target.parentElement
      card = event.target
   }
   else if (event.target.classList.contains('back')) {
      deck = event.target.parentElement.parentElement
   }

   if (deck != null) {
      const action = deck.dataset.action;
      const type = deck.dataset.type
      let suit = '';
      let index = -1;
      let cardIndex = -1;
      let cards = undefined

      if (type == 'foundations') {
         suit = deck.dataset.suit
      } else if (type == 'piles') {
         index = Number(deck.dataset.index)
      }

      if (card != null) {
         cardIndex = Number(card.dataset.index)
      }

      switch (action) {
         case 'flip':
            if (type == 'stock') {
               flipStock();
            } else if (type == 'piles') {
               flipPile(index)
            }
            break

         case 'take':

            const deck = findDeck(type,index,suit)
            if (type == 'piles') {
               deck = state[type][index]
            } else if (type == 'foundations') {
               cards = state[type][suit];
            } else {
               cards = state[type]
            }
            cards = deck.cards.slice(cardIndex)


            currentMove = {
               source: deck,
               type,
               index,
               cardIndex
            };
            break

            case 'place':
               const target = findDeck(type, index, suit)
               const selectedCards = currentMove.source.take(currentMove.cardIndex) 
               target.place(selectedCards)
               currentMove = null;
               break
      }


      console.log(action, type, index, cardIndex);
      console.log(currentMove);

      deckIndex.forEach(deck => deck.moves = getMoves(deck))
      stateToBoard(state)
   }
}

function findDeck(type, index, suit){
   let deck = null;  
   if (type == 'piles') {
      deck = state[type][index]
   } else if (type == 'foundations') {
      cards = state[type][suit];
   } else {
      cards = state[type]
   }
   return deck
}

function flipStock() {
   if (state.stock.size == 0) {
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

function flipPile() {
   state.piles[deckIndex].flip()
}



