import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { AiService } from '../services/ai.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  private difficulty = 0;

  constructor(private router: Router,
              private gameService: GameService,
              private ai: AiService) { }

  ngOnInit() {
  }

  onSelectionChange(num: number){
    this.difficulty = num;
  }

  loadGame(): void {
    console.log(`Loading game with difficulty ${this.difficulty}`);
    console.log('Initializing cards');
    this.gameService.init();
    console.log('Setting difficulty.');
    this.ai.setDifficulty(this.difficulty);
    this.router.navigateByUrl('game');
  }

}
