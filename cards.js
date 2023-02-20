class Card {
    face= null
    suit = null
    faceUp = false

    constructor(suit, face, faceUp = false){
        this.suit = suit
        this.face = face
        this.faceUp = faceUp
    }
}


class Deck {
    /** @type {Card[]?} */
    cards = []

    constructor (cards = []){
        this.cards = cards
    }

    get top(){
        return this.cards[this.cards.length - 1]
    }

    canFlip(){
        return this.cards.length > 0 && this.top.faceUp == false
    }

    canTake(){
        throw new TypeError ('Cannot invoke abstract method')

    }

    /** @type {Card | Card[]} */

    canReplace(cards){
        throw new TypeError ('Cannot invoke abstract method')
    }

    flip(){
        if(this.canFlip() == false) {
            throw new Error ('Cannot flip card')
        }
    }

    take(index){
        throw new TypeError ('Cannot invoke abstract method')
    }

    place(cards){
        throw new TypeError ('Cannot invoke abstract method')
    }
}