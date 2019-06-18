import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { TYPE, COLOR, Card } from 'src/app/models/card';

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
      return this.getMoveMedium(gameService);
    }
    if(this.difficulty == 2){
      return this.getMoveMedium(gameService);
    }
  }

  getMoveEasy(gameService: GameService): Card{
    console.log("Deciding Easy Move");

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

  getMoveMedium(gameService: GameService): Card {
    console.log("Deciding Medium Move");

    //Get the number of each color in the players hand
    let colors: number[] = [0,0,0,0];
    for(let c of gameService.getCardsInHand(1)){
      switch(c.color){
        case COLOR.RED:
          colors[0]++;
          break;
        case COLOR.GREEN:
          colors[1]++;
          break;
        case COLOR.BLUE:
          colors[2]++;
          break;
        case COLOR.YELLOW:
          colors[3]++;
          break;
      }
    }
    let commonColor = ([COLOR.RED, COLOR.GREEN, COLOR.BLUE, COLOR.YELLOW])[colors.indexOf(Math.max(...colors))];


    //Use a skip or +2 if possible
    for(let c of gameService.getValidCards()){
      if(c.type == TYPE.SKIP){
        return c;
      }
    }
    for(let c of gameService.getValidCards()){
      if(c.type == TYPE.DRAW_TWO){
        return c;
      }
    }

    //Look for non wild card to switch to most common color
    for(let c of gameService.getValidCards()){
      if(c.type == TYPE.NORM || c.type == TYPE.REVERSE){
        if(c.color == commonColor){
          return c;
        }
      }
    }

    //Try to switch to most common with wild card
    let wild: Card = null;
    for(let c of gameService.getValidCards()){
      if(c.type == TYPE.WILD_FOUR){
        //Set color
        wild = c;
        break;
      }
      if(c.type == TYPE.WILD){
        wild = c;
      }
    }
    if(wild != null){
      gameService.setCurrentColor(commonColor);
      return wild;
    }

    //pick a random card to use
    let randomIndex = Math.ceil(Math.random() * gameService.getValidLength())-1;
    let card = gameService.getValidCard(randomIndex);
    return card;
  }

}
