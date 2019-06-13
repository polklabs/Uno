import { Component, Input } from '@angular/core';
import { Card } from 'src/app/shared/assets/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() card: Card;
  @Input() valid: boolean;

}
