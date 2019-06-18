import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit {

  redPercent: number;
  greenPercent: number;
  bluePercent: number;
  yellowPercent: number;

  constructor(public gameService: GameService) { }

  ngOnInit() {
    let colors = this.gameService.getColorStat();

    let total = colors.reduce((total, current) => total + current, 0);
    this.redPercent = (colors[0]/total)*100;
    this.greenPercent = (colors[1]/total)*100;
    this.bluePercent = (colors[2]/total)*100;
    this.yellowPercent = (colors[3]/total)*100;
  }

}
