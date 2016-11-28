module checkersModel {
    export enum CheckerColor {
        Red = 1,
        White,
        Black
    }
    export class Checker{
        index;
        color: CheckerColor;

        constructor(index, color) {
            this.index = index;
            this.color = color;
        }
    }

    export class CheckersActionBase{
    	checkerPiece : Checker;
    	nextActionBase : CheckersActionBase;
    }


    export class CheckersActionMove extends CheckersActionBase{
    	initPosition: number;
    	finalPosition: number;
    }
}