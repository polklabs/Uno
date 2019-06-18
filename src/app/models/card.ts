export enum TYPE {WILD=0, WILD_FOUR=1, NORM=2, SKIP=3, DRAW_TWO=4, REVERSE=5};
export enum COLOR {RED="red", GREEN="green", BLUE="blue", YELLOW="yellow"};

export class Card {
    type: TYPE;
    value: number;
    color: COLOR;

    constructor(type: TYPE, value: number, color: COLOR){
        this.type = type;
        this.value = value;
        this.color = color;
    }

}