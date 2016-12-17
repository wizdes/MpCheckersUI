/// <reference path="checkersModel.ts" />
/// <reference path="../input/checkersInput.ts" />
module GameStateController {
    export enum quickplayState {
        OnUserInput = 1,
        OnUserSelectMove,
    }

    export class QuickGameState {
    	checkerTurn : checkersModel.CheckerColor;
    	intGameState : quickplayState;

    	nogoLeft: Array<number>;
    	nogoRight: Array<number>;


    	constructor(){
    		this.checkerTurn = checkersModel.CheckerColor.Red;
    		this.intGameState = quickplayState.OnUserInput;
    		this.nogoLeft = [8, 24, 40, 56];
    		this.nogoRight = [7, 23, 31, 55];

    	}

        GetActionApplyStateChange(userInput: CheckersInput.UserInput) {
            if (this.intGameState == quickplayState.OnUserInput ||
            this.intGameState == quickplayState.OnUserSelectMove) {
                return this.HandleOnUserInputState(userInput);
            }
        }

        HandleOnUserInputState(userInput: CheckersInput.UserInput) {
            if (userInput.clickedElt.type == checkersModel.ElementType.CheckPiece) {
                if (userInput.clickedElt.color == checkersModel.CheckerColor.Red) {
                    this.intGameState = quickplayState.OnUserSelectMove;
                    let action = new checkersModel.CheckersActionHighlightMove();
                    action.clickedElt = userInput.clickedElt;
                    action.nextActionBase = null;
                    action.boardElementsToHighlight = [];

                    if(this.nogoRight.indexOf(userInput.clickedElt.index) == -1){
                    	action.boardElementsToHighlight.push(userInput.clickedElt.index - 7);
                   	}

                    if(this.nogoLeft.indexOf(userInput.clickedElt.index) == -1){
                    	action.boardElementsToHighlight.push(userInput.clickedElt.index - 9);
                   	}
                    return action;
                }
            }

            return new checkersModel.CheckersEmptyMove();
        }
    }
}