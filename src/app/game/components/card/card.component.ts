import { Component, Input } from '@angular/core';
import { Card, COLOR } from 'src/app/models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() card: Card;
  @Input() valid: boolean;
  @Input() color: COLOR;
  @Input() hidden: boolean = false;
}
