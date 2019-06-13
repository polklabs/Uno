import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Deck, Hand } from 'src/app/shared/assets/piles';
import { Card } from 'src/app/shared/assets/card';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {

  @Input() deck: Deck;
  @Input() discard: Card[];
  @Input() hands: Hand[];

  @Input() validCards: Card[];

  @Input() message: String;

  @Output() play = new EventEmitter<Card>();

  playCard(card: Card){
    this.play.emit(card);
  }

}
