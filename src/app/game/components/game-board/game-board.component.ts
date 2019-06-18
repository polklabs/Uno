import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Deck, Hand } from 'src/app/models/piles';
import { Card, COLOR } from 'src/app/models/card';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {

  @Input() deck: number;
  @Input() discard: Card;
  @Input() hands: Card[];

  @Input() validCards: Card[];
  @Input() newColor: COLOR;

  @Input() message: String;
  @Input() ended: number;
  @Input() turn: number;

  @Input() uno: boolean;

  @Output() play = new EventEmitter<Card>();
  @Output() draw = new EventEmitter<void>();
  @Output() unoButton = new EventEmitter<void>();

  constructor(){}

  playCard(card: Card){
    this.play.emit(card);
  }

  drawCard(){
    this.draw.emit();
  }

  pressUno(){
    this.unoButton.emit();
  }

}