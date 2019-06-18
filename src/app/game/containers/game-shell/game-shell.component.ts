import { Component, OnInit, Inject } from '@angular/core';
import { Card, TYPE, COLOR } from 'src/app/models/card';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GameService } from '../../../services/game.service';
import { AiService } from '../../../services/ai.service';
import { Router } from '@angular/router';

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

  uno: boolean;

  constructor(public gameService: GameService,
              public ai: AiService,
              public router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {

    if(this.gameService.isNewGame()){
      for(var i = 0; i < this.gameService.getPlayers(); i++){
        this.dealCards(i, 7);
      }

      this.startCard();
      this.gameService.notNewGame();
    }

    this.checkValid();

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogColor, {
      width: '250px',
      data: {color: COLOR.RED}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.gameService.setCurrentColor(result);
      this.endTurn();
    })
  }

  play(card: Card): void {
    if(this.gameService.getTurn() == 0){
      this.playCard(card);
    }
  }

  playCard(card: Card): void {

    let turn  = this.gameService.getTurn();

    console.log(`Player ${turn} playing ${card}`);

    this.gameService.addCardToDiscard(card);
    this.gameService.removeCardFromHand(card, turn);

    if(turn == 0){
      if(card.type == TYPE.WILD || card.type == TYPE.WILD_FOUR){
        this.openDialog();
        return;
      }

      this.gameService.setCurrentColor(card.color);
    }

    this.endTurn();
  }

  drawCard(): void {
    if(this.gameService.getValidLength() == 0){
      this.dealCards(this.gameService.getTurn(), 1);
      this.checkValid();
    }
  }

  endTurn(){
    if(this.gameService.getHandLength(0) == 0){
      this.gameService.setWinner(0);
      this.router.navigateByUrl('end');
      return;
    }
    if(this.gameService.getHandLength(1) == 0){
      this.gameService.setWinner(1);
      this.router.navigateByUrl('end');
      return;
    }

    this.gameService.increaseTurnNumber();

    let turn = this.gameService.getTurn();

    switch(this.gameService.getLastCardInDiscard().type){
      case TYPE.SKIP:
        this.gameService.increaseTurnNumber();
        turn = this.gameService.getTurn();
        break;
      case TYPE.DRAW_TWO:
        this.dealCards(turn, 2);
        break;
      case TYPE.WILD_FOUR:
        this.dealCards(turn, 4);
        break;
    }

    this.checkUno(this.gameService.getOpp());

    this.checkValid();

    if(turn == 1){
      setTimeout(() => {
        this.aiTurn();
      }, Math.round(Math.random()*1500*this.ai.difficulty)+1000);
    }
  }

  aiTurn(){

    while(this.gameService.getValidLength() == 0){
      this.drawCard();
    }
    
    this.playCard(this.ai.getMove(this.gameService));
  }

  startCard(){
    console.log("Finding suitable starting card.");
    
    let card: Card;
    
    card = this.gameService.removeCardFromDeck();
  
    while(card.type == TYPE.WILD || card.type == TYPE.WILD_FOUR){
      this.gameService.shuffleIntoDeck(card);
      card = this.gameService.removeCardFromDeck();
    }
    
    this.gameService.addCardToDiscard(card);
    this.gameService.setCurrentColor(card.color);
  }

  dealCards(player: number, cards: number){
    console.log(`Dealing ${cards} cards to player ${player}`);

    for(var i = 0; i < cards; i++){

      if(this.gameService.getDeckLength() == 0){
        this.gameService.shuffleDiscard();
      }

      this.gameService.addCardToHand(this.gameService.removeCardFromDeck(), player);
    }
  }

  checkValid(){
    let turn = this.gameService.getTurn()

    this.gameService.resetValidCards();

    for(let card of this.gameService.getCardsInHand(turn)){
      if(this.gameService.getLastCardInDiscard().type == TYPE.WILD || 
         this.gameService.getLastCardInDiscard().type == TYPE.WILD_FOUR){
        if(card.color == this.gameService.getCurrentColor()){
          this.gameService.addValidCard(card);
        }
        else if(card.type == TYPE.WILD){
          this.gameService.addValidCard(card);
        }
        else if(card.type == TYPE.WILD_FOUR){
          this.gameService.addValidCard(card);
        }
      }else{
        if(card.value == this.gameService.getLastCardInDiscard().value){
          this.gameService.addValidCard(card);
        }
        else if(card.color == this.gameService.getCurrentColor()){
          this.gameService.addValidCard(card);
        }
        else if(card.type == TYPE.WILD){
          this.gameService.addValidCard(card);
        }
        else if(card.type == TYPE.WILD_FOUR){
          this.gameService.addValidCard(card);
        }
      }
    }
  }

  checkUno(player: number){
    if(this.gameService.getCardsInHand(player).length == 1){
      console.log('Starting UNO countdown.');

      this.uno = true;

      let t = Math.round(Math.random()*500)+(333*(2-this.ai.difficulty)*1.5);
      setTimeout(() => {
        this.UNO(1);
      }, t);
    }
  }

  UNO(player: number){
    let turn = this.gameService.getTurn();
    if(this.uno){
      if(turn == player){
        this.dealCards(this.gameService.getOpp(), 2);
      }
    }
    this.uno = false;
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
