import { Component, OnInit, Inject } from '@angular/core';
import { Deck, Hand } from 'src/app/shared/assets/piles';
import { Card, TYPE, COLOR } from 'src/app/shared/assets/card';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  color: COLOR;
}

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
  newColor: COLOR = null;
  hands: Hand[];

  valid: Card[];

  players: number = 2;
  turnNumber: number = 0;

  constructor(public dialog: MatDialog) { }

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

    this.checkValid();

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogColor, {
      width: '250px',
      data: {color: this.newColor}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(this.newColor);
    })
  }

  endTurn(){
    this.turnNumber++;

    switch(this.lastPlay.type){
      case TYPE.SKIP:
        this.turnNumber++;
        break;
      case TYPE.DRAW_TWO:
        this.dealCards(this.turnNumber%this.players, 2);
        break;
      case TYPE.WILD_FOUR:
        this.dealCards(this.turnNumber%this.players, 4);
        break;
    }

    this.checkValid();
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

    this.valid = [];

    for(let card of this.hands[turn].cards){
      if(this.lastPlay.type == TYPE.WILD || this.lastPlay.type == TYPE.WILD_FOUR){
        if(card.color == this.newColor){
          this.valid.push(card);
        }
        else if(card.type == TYPE.WILD){
          this.valid.push(card);
        }
        else if(card.type == TYPE.WILD_FOUR){
          this.valid.push(card);
        }
      }else{
        if(card.value == this.lastPlay.value){
          this.valid.push(card);
        }
        else if(card.color == this.lastPlay.color){
          this.valid.push(card);
        }
        else if(card.type == TYPE.WILD){
          this.valid.push(card);
        }
        else if(card.type == TYPE.WILD_FOUR){
          this.valid.push(card);
        }
      }
    }
  }

}

@Component({
  selector: 'dialog-color',
  templateUrl: 'dialog-color.html'
})
export class DialogColor {
  constructor(
    public dialogRef: MatDialogRef<DialogColor>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData){}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
