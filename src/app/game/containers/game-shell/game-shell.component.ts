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
      data: {color: COLOR.RED}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newColor = result;
      console.log('The dialog was closed');
      console.log(this.newColor);
      //this.checkValid();
      this.endTurn();
    })
  }

  playCard(card: Card): void {
    console.log("Play");

    let turn  = this.turnNumber%this.players;

    this.lastPlay = card;
    this.hands[turn].removeCard(card);
    this.discard.push(card);

    if(turn == 0){
      if(card.type == TYPE.WILD || card.type == TYPE.WILD_FOUR){
        this.openDialog();
        return;
      }

      this.newColor = card.color;
    }

    this.endTurn();
  }

  drawCard(): void {
    console.log("Draw");
    if(this.valid.length == 0){
      let turn = this.turnNumber%this.players;
      this.dealCards(turn, 1);
      this.checkValid();
    }
  }

  endTurn(){
    this.turnNumber++;

    let turn = this.turnNumber%this.players;

    switch(this.lastPlay.type){
      case TYPE.SKIP:
        this.turnNumber++;
        turn = this.turnNumber%this.players;
        break;
      case TYPE.DRAW_TWO:
        this.dealCards(turn, 2);
        break;
      case TYPE.WILD_FOUR:
        this.dealCards(turn, 4);
        break;
    }

    this.checkValid();

    if(turn == 1){
      console.log("Start AI turn");
      setTimeout(() => {
        this.aiTurn();
      }, Math.round(Math.random()*3000)+500);
    }
  }

  aiTurn(){
    console.log("AI TURN");

    while(this.valid.length == 0){
      this.drawCard();
    }
    let randomIndex = Math.ceil(Math.random() * this.valid.length)-1;
    let card = this.valid[randomIndex];
    console.log(card);

    if(card.type == TYPE.WILD || card.type == TYPE.WILD_FOUR){
      let rgby: number[] = [0,0,0,0];
      for(let c of this.hands[1].cards){
        switch(c.color){
          case COLOR.RED:
            rgby[0]++;
            break;
          case COLOR.GREEN:
            rgby[1]++;
            break;
          case COLOR.BLUE:
            rgby[2]++;
            break;
          case COLOR.YELLOW:
            rgby[3]++;
            break;
        }
      }

      //Choose whichever color is most common, default red
      let i = rgby.indexOf(Math.max(...rgby));
      switch(i){
        case 0:
          this.newColor = COLOR.RED;
          break;
        case 1:
          this.newColor = COLOR.GREEN;
          break;
        case 2:
          this.newColor = COLOR.BLUE;
          break;
        case 3:
          this.newColor = COLOR.YELLOW;
          break;
        default:
          this.newColor = COLOR.RED;
      }

    }
    else{
      this.newColor = card.color;
    }

    this.playCard(card);
  }

  startCard(){
    
    let card: Card;
    
    card = this.deck.pickCard();
  
    while(card.type == TYPE.WILD || card.type == TYPE.WILD_FOUR){
      console.log("Wild Card");
      let randomIndex = Math.floor(Math.random() * this.deck.cards.length)-1;
      this.deck.cards.splice(randomIndex, 0, card);
      card = this.deck.pickCard();
    }
    
    this.discard.push(card);
    this.lastPlay = card;
    this.newColor = this.lastPlay.color;
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
        else if(card.color == this.newColor){
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

  onSelectionChange(color: number) {
    switch(color){
      case 0:
        this.data.color = COLOR.RED;
        break;
      case 1:
          this.data.color = COLOR.GREEN;
          break;
      case 2:
        this.data.color = COLOR.BLUE;
        break;
      case 3:
        this.data.color = COLOR.YELLOW;
        break;
    }
  }

  onNoClick(): void {
    this.dialogRef.close(COLOR.RED);
  }
}
