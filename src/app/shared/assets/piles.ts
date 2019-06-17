import { COLOR, Card, TYPE} from './card';

export class Hand{
    cards: Card[];
    player: number;

    constructor(player: number){
        this.player = player;
        this.cards = [];
    }

    addCard(card: Card){
        this.cards.push(card);
    }
    removeCard(card: Card): Card{
        let index: number = this.cards.indexOf(card);
        if(index != -1){
            this.cards.splice(index, 1);
            return card;
        }
        return null;
    }
}

export class Deck{
    cards: Card[];

    constructor(){
        this.cards = [];

        let colors = [COLOR.RED, COLOR.GREEN, COLOR.BLUE, COLOR.YELLOW];
        for(let color of colors){

            //One 0
            this.cards.push(new Card(TYPE.NORM, 0, color));

            //Two of all other numbers
            for(var i = 1; i < 10; i++){
                for(var j = 0; j < 2; j++){
                    this.cards.push(new Card(TYPE.NORM, i, color));
                }
            }

            for(var j = 0; j < 2; j++){
                this.cards.push(new Card(TYPE.SKIP, -1, color));
            }

            for(var j = 0; j < 2; j++){
                this.cards.push(new Card(TYPE.REVERSE, -2, color));
            }

            for(var j = 0; j < 2; j++){
                this.cards.push(new Card(TYPE.DRAW_TWO, -3, color));
            }

        }

        for(var j = 0; j < 4; j++){
            this.cards.push(new Card(TYPE.WILD, -4, null));
        }

        for(var j = 0; j < 4; j++){
            this.cards.push(new Card(TYPE.WILD_FOUR, -5, null));
        }

    }

    pickCard(): Card{
        return this.cards.pop();
    }

    addCards(cards: Card[]){
        this.cards.push(...cards);
    }

    shuffle(){
        console.log("Shuffling Cards.");

        let currentIndex = this.cards.length;
        let tempValue: Card;
        let randomIndex: number;

        // While there remain elements to shuffle...
        while( 0 !== currentIndex){

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            tempValue = this.cards[currentIndex];
            this.cards[currentIndex] = this.cards[randomIndex];
            this.cards[randomIndex] = tempValue;
        }
    }

}