import { Component, Input } from '@angular/core';
import { Card, COLOR, TYPE } from 'src/app/models/card';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() card: Card;
  @Input() valid: boolean;
  @Input() color: COLOR = null;
  @Input() hidden: boolean = false;

  constructor() {
    this.onresize();
  }

  showDeets: boolean;

  @HostListener('window:resize', ['$event'])
  onresize(event?) {
    this.showDeets = window.innerWidth>530?true:false;
  }

  getName(): string {
    switch(this.card.type){
      case TYPE.NORM:
        return this.card.value.toString();
      case TYPE.SKIP:
        return "SKIP";
      case TYPE.REVERSE:
        return "REVERSE";
      case TYPE.DRAW_TWO:
        return "+2";
      case TYPE.WILD:
        return "WILD";
      case TYPE.WILD_FOUR:
        return "+4";
    }
  }

  getNameSmall(): string {
    switch(this.card.type){
      case TYPE.NORM:
        return this.card.value.toString();
      case TYPE.SKIP:
        return "";
      case TYPE.REVERSE:
        return "";
      case TYPE.DRAW_TWO:
        return "+2";
      case TYPE.WILD:
        return "WILD";
      case TYPE.WILD_FOUR:
        return "WILD +4";
    }
  }

}
