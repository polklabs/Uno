import { Injectable } from '@angular/core';
import { Deck, Hand } from '../shared/assets/piles';
import { Card, COLOR, TYPE } from '../shared/assets/card';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private deck: Deck;
  private discard: Card[];
  private currentColor: COLOR;
  private hands: Hand[];
  private isEnded: number;

  private valid: Card[];

  private players: number;
  private turnNumber: number;

  constructor() { 
    this.currentColor = null;
    this.isEnded = -1;
    this.players = 2;
    this.turnNumber = 0;

    this.deck = new Deck();
    this.deck.shuffle();
    
    this.discard = [];

    this.hands = [];
    for(var i = 0; i < this.players; i++){
      this.hands[i] = new Hand(i);
    }

    this.valid = [];
  }

  /* Deck */
  removeCardFromDeck(): Card {
    return this.deck.pickCard();
  }
  shuffleDeck(): void {
    this.deck.shuffle();
  }
  shuffleDiscard(): void {
    if(this.discard.length > 0){
      let card = this.discard.pop();
      this.deck.addCards(this.discard);
      this.discard = [];
      this.discard.push(card);
    }
  }
  shuffleIntoDeck(card: Card){
    let randomIndex = Math.floor(Math.random() * this.deck.cards.length)-1;
    this.deck.cards.splice(randomIndex, 0, card);
  }
  getDeckLength(): number{
    return this.deck.cards.length;
  }

  /* Discard */
  addCardToDiscard(card: Card): Card {
    this.discard.push(card);
    if(card.type != TYPE.WILD && card.type != TYPE.WILD_FOUR){
      this.currentColor = card.color; 
    }
    return card;
  }
  getLastCardInDiscard(): Card {
    let len = this.discard.length;
    if(len > 0){
      return this.discard[len-1];
    }
    return null;
  }

  /* Color */
  setCurrentColor(color: COLOR): COLOR{
    if(this.getLastCardInDiscard().type == TYPE.WILD || 
       this.getLastCardInDiscard().type == TYPE.WILD_FOUR){
         
      this.currentColor = color;
      return this.currentColor;
    }
    else{
      return this.currentColor;
    }
  }
  getCurrentColor(): COLOR {
    return this.currentColor;
  }

  /* Hands */
  removeCardFromHand(card: Card, hand: number): Card{
    return this.hands[hand].removeCard(card);
  }
  addCardToHand(card: Card, hand: number): Card{
    this.hands[hand].addCard(card);
    return card;
  }
  getHandLength(hand: number): number{
    return this.hands[hand].cards.length;
  }
  getCardsInHand(hand: number): ReadonlyArray<Card> {
    return this.hands[hand].cards;
  }

  /* Winner */
  getWinner(): number {
    return this.isEnded;
  }
  setWinner(player: number) {
    if(player < 0 || player > this.players){
      return;
    }

    this.isEnded = player;
  }

  /* Valid Cards */
  getValidCards(): ReadonlyArray<Card> {
    return this.valid;
  }
  getValidCard(index: number): Card {
    if(index >= 0 && index < this.valid.length){
      return this.valid[index];
    }
  }
  resetValidCards(): void {
    this.valid = [];
  }
  addValidCard(card: Card) {
    this.valid.push(card);
  }
  getValidLength(): number {
    return this.valid.length;
  }

  getPlayers(): number {
    return this.players;
  }

  /* Turn */
  getTurnNumber(): number {
    return this.turnNumber;
  }
  increaseTurnNumber(): void {
    this.turnNumber++;
  }
  getTurn(): number {
    return this.turnNumber % this.players;
  }
}
