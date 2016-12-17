module checkersModel {

    export class CommonFunctions {
        getBoardCoord(position: number) {
            return [position % 8, Math.floor(position / 8)];
        }
    }

    export enum CheckerColor {
        Red = 1,
        White,
        Black,
        None
    }

    export enum ElementType {
        CheckPiece = 1,
        BoardPiece
    }

    export class Checker{
        index;
        highlightBoardPosition;
        color: CheckerColor;
        type : ElementType;

        constructor(index, color, type, pos) {
            this.index = index;
            this.color = color;
            this.type = type;
            this.highlightBoardPosition = pos;
        }
    }

    export class CheckersActionBase{
    	clickedElt : Checker;
    	nextActionBase : CheckersActionBase;
    }

    export class CheckersActionMove extends CheckersActionBase{
    	initPosition: number;
    	finalPosition: number;
    }

    export class CheckersActionHighlightMove extends CheckersActionBase {
        boardElementsToHighlight: number[];
    }

    export class CheckersEmptyMove extends CheckersActionBase {
    }
}