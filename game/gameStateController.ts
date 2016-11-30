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

    	constructor(){
    		this.checkerTurn = checkersModel.CheckerColor.Red;
    		this.intGameState = quickplayState.OnUserInput;
    	}

        GetActionApplyStateChange(userInput: CheckersInput.UserInput) {
            if (this.intGameState == quickplayState.OnUserInput) {
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
                    action.boardElementsToHighlight.push(userInput.clickedElt.index - 7);
                    action.boardElementsToHighlight.push(userInput.clickedElt.index - 7);
                    return action;
                }
            }

            return new checkersModel.CheckersEmptyMove();
        }
    }
}