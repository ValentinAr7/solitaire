class Card {
    face = null
    suit = null
    faceUp = false

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

    get topIndex(){
        return this.cards.length - 1
    }

    canFlip() {
        return this.cards.length > 0 && this.top.faceUp == false
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
        return this.cards.length > 0 && index == this.topIndex;
    }

    /** @type {Card | Card[]} */

    canPlace(cards) {
        return false;
    }

    take(index) {
        if(this.canTake(index) == false) {
            throw new Error ('Cannot take card')
        }
    }

    place(cards) {
        throw new Error('Cannot place on waste')
    }

}