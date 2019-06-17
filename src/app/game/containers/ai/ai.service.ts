import { Injectable } from '@angular/core';
import { GameService } from '../../game.service';
import { TYPE, COLOR, Card } from 'src/app/shared/assets/card';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  difficulty: number = 0;

  constructor() { }

  setDifficulty(diff: number){
    this.difficulty = diff;
  }

  getMove(gameService: GameService): Card{
    if(this.difficulty == 0){
      return this.getMoveEasy(gameService);
    }
    if(this.difficulty == 1){
      return this.getMoveEasy(gameService);
    }
    if(this.difficulty == 2){
      return this.getMoveEasy(gameService);
    }
  }

  getMoveEasy(gameService: GameService): Card{
    let randomIndex = Math.ceil(Math.random() * gameService.getValidLength())-1;
    let card = gameService.getValidCard(randomIndex);
    console.log(card);

    if(card.type == TYPE.WILD || card.type == TYPE.WILD_FOUR){
      let rgby: number[] = [0,0,0,0];
      for(let c of gameService.getCardsInHand(1)){
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
            gameService.setCurrentColor(COLOR.RED);
          break;
        case 1:
            gameService.setCurrentColor(COLOR.GREEN);
          break;
        case 2:
            gameService.setCurrentColor(COLOR.BLUE);
          break;
        case 3:
            gameService.setCurrentColor(COLOR.YELLOW);
          break;
        default:
            gameService.setCurrentColor(COLOR.RED);
      }

    }
    else{
      gameService.setCurrentColor(card.color);
    }

    return card;

  }

}
