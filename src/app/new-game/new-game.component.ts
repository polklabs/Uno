import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {

  private difficulty = 0;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSelectionChange(num: number){
    this.difficulty = num;
  }

  loadGame(): void {
    console.log(`Loading game with difficulty ${this.difficulty}`);
    this.router.navigateByUrl('game');
  }

}
