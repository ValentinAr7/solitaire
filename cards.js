const faces = {
    Ace: 1,
    Two: 2,
    Three: 3,
    Four: 4,
    Five: 5,
    Six: 6,
    Seven: 7,
    Eight: 8,
    Nine: 9,
    Ten: 10,
    Jack: 11,
    Queen: 12,
    King: 13
}

const suits = {
    Clubs: 'clubs',
    Diamonds: 'diamonds',
    Hearts: 'hearts',
    Spades: 'spades'
}

class Card {
    /** @type {keyof faces} */
    face = null

    /** @type {keyof suits} */
    suit = null

    /** @type {boolean} */
    faceUp = false


    /** 
    * @param {keyof faces} suit 
    * @param {keyof suits} face
    * @param {boolean} faceUp
    */


    constructor(suit, face, faceUp = false) {
        this.suit = suit
        this.face = face
        this.faceUp = faceUp
    }
}


class Deck {
    /** @type {Card[]?} */
    cards = []

    constructor(cards = []) {
        this.cards = cards
    }

    get top() {
        return this.cards[this.topIndex]
    }

    get topIndex() {
        return this.size - 1
    }

    get size() {
        return this.size
    }

    canFlip() {
        return this.size > 0 && this.top.faceUp == false
    }

    canTake(index) {
        throw new TypeError('Cannot invoke abstract method')

    }

    /** @type {Card | Card[]} */

    canPlace(cards) {
        throw new TypeError('Cannot invoke abstract method')
    }

    flip() {
        if (this.canFlip() == false) {
            throw new Error('Cannot flip card')
        }
    }

    take(index) {
        throw new TypeError('Cannot invoke abstract method')
    }

    place(cards) {
        throw new TypeError('Cannot invoke abstract method')
    }
}

class Stock extends Deck {

    canTake(index) {
        return false;
    }

    /** @type {Card | Card[]} */

    canPlace(cards) {
        return false;
    }


    take(index) {
        throw new Error('Cannot take from stock')
    }

    place(cards) {
        throw new Error('Cannot place on stock')
    }

}


class Waste extends Deck {

    canTake(index) {
        return this.size > 0 && index == this.topIndex;
    }

    /** @type {Card | Card[]} */

    canPlace(cards) {
        return false;
    }

    take(index) {
        if (this.canTake(index) == false) {
            throw new Error('Cannot take card')
        }
        this.cards.splice(index, this.size - index)
    }

    place(cards) {
        throw new Error('Cannot place on waste')
    }

}

class Foundation extends Deck {

    suit = null

    constructor(cards, suits) {
        super(cards)
        this.suits = suits
    }
    canTake(index) {
        return this.size > 0 && index == this.topIndex
    }

    /** @type {Card | Card[]} */

    canPlace(cards) {
        if (Array.isArray(cards)) {
            return false
        }

        this.cards.suits == this.suits;
        cards.face == faces.Ace && this.size > 0 || (cards.face + 1) == this.top.face;
    }

    take(index) {
        if (this.canTake(index) == false) {
            throw new Error('Cannot take card')
        }
        this.cards.splice(index, this.size - index)
    }

    place(cards) {
        throw new Error('Cannot place on waste')
    }

}