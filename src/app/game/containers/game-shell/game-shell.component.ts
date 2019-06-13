import { Component, OnInit } from '@angular/core';
import { Deck, Hand } from 'src/app/shared/assets/piles';
import { Card, TYPE } from 'src/app/shared/assets/card';

@Component({
  selector: 'app-game-shell',
  templateUrl: './game-shell.component.html',
  styleUrls: ['./game-shell.component.css']
})
export class GameShellComponent implements OnInit {

  messages: String[] = ["Player one's turn.", "Player two's turn."];

  deck: Deck;
  discard: Card[];
  lastPlay: Card;
  hands: Hand[];

  valid: Card[];

  players: number = 2;
  turnNumber: number = 0;

  constructor() { }

  ngOnInit() {

    this.deck = new Deck();
    this.deck.shuffle();

    this.discard = [];

    this.hands = [];
    for(var i = 0; i < this.players; i++){
      this.hands[i] = new Hand(i);
      this.dealCards(i, 7);
    }

    this.startCard();

    this.valid = [];

  }

  startCard(){
    
    let card: Card;
    
    card = this.deck.pickCard();
  
    while(card.type == TYPE.WILD || card.type == TYPE.WILD_FOUR){
      console.log("Wild Card");
      let randomIndex = Math.floor(Math.random() * this.deck.cards.length-1);
      this.deck.cards.splice(randomIndex, 0, card);
      card = this.deck.pickCard();
    }
    
    this.discard.push(card);
    this.lastPlay = card;

  }

  dealCards(player: number, cards: number){
    for(var i = 0; i < cards; i++){
      this.hands[player].addCard(this.deck.pickCard());
    }
  }

  checkValid(){
    let turn = this.turnNumber%this.players;



    for(let card of this.hands[turn].cards){

    }
  }

}
