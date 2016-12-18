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

        pieceMap: {};


    	constructor(){
    		this.checkerTurn = checkersModel.CheckerColor.Red;
    		this.intGameState = quickplayState.OnUserInput;
    		this.nogoLeft = [8, 24, 40, 56];
            this.nogoRight = [7, 23, 31, 55];
            this.pieceMap = {};

            let topList: Array<number> = [1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23];
            let bottomList: Array<number> = [40, 42, 44, 46, 49, 51, 53, 55, 56, 58, 60, 62];

            for (let i = 0; i < 12; i++) {
                this.pieceMap[i] = topList[i];
            }

            for (let i = 0; i < 12; i++) {
                this.pieceMap[12 + i] = bottomList[i];
            }

    	}

        GetActionApplyStateChange(userInput: CheckersInput.UserInput) {
            if (this.intGameState == quickplayState.OnUserInput ||
            this.intGameState == quickplayState.OnUserSelectMove) {
                return this.HandleOnUserInputState(userInput);
            }
        }

        HandleOnUserInputState(userInput: CheckersInput.UserInput) {
            if (userInput.clickedElt.type == checkersModel.ElementType.CheckPiece) {
                if (userInput.clickedElt.color == checkersModel.CheckerColor.Red ||
                    userInput.clickedElt.color == checkersModel.CheckerColor.White) {
                    this.intGameState = quickplayState.OnUserSelectMove;
                    let action = new checkersModel.CheckersActionHighlightMove();
                    action.clickedElt = userInput.clickedElt;
                    action.nextActionBase = null;
                    action.boardElementsToHighlight = [];

                    let potentialEaten = [];

                    if (this.nogoRight.indexOf(this.pieceMap[userInput.clickedElt.index]) == -1) {
                        let val = this.GetMove(userInput, "RIGHT", true);
                        let isPotentialEaten = false;
                        for (let i = 0; i < 24; i++) {
                            if (this.pieceMap[i] == val) {
                                isPotentialEaten = true;
                                potentialEaten.push(i);
                            }
                        }

                        if (!isPotentialEaten) {
                            action.boardElementsToHighlight.push(val);
                        }
                    }

                    if (this.nogoLeft.indexOf(this.pieceMap[userInput.clickedElt.index]) == -1) {
                        let val = this.GetMove(userInput, "LEFT", true);
                        let isPotentialEaten = false;
                        for (let i = 0; i < 24; i++) {
                            if (this.pieceMap[i] == val) {
                                isPotentialEaten = true;
                                potentialEaten.push(i);
                            }
                        }

                        if (!isPotentialEaten) {
                            action.boardElementsToHighlight.push(val);
                        }
                    }
                    return action;
                }
            }
            else if (userInput.clickedElt.type == checkersModel.ElementType.BoardPiece) {
                this.intGameState = quickplayState.OnUserInput;
                let action = new checkersModel.CheckersActionMove();
                action.clickedElt = userInput.clickedElt;
                action.nextActionBase = null;
                action.initPosition = this.pieceMap[userInput.refElt.index];
                action.finalPosition = userInput.clickedElt.highlightBoardPosition;
                this.pieceMap[userInput.refElt.index] = userInput.clickedElt.highlightBoardPosition;

                return action;
            }

            return new checkersModel.CheckersEmptyMove();
        }

        GetMove(userInput: CheckersInput.UserInput, movePosition: string, isForward: boolean) {
            if ((userInput.clickedElt.color == checkersModel.CheckerColor.Red && isForward) ||
                (userInput.clickedElt.color == checkersModel.CheckerColor.White && !isForward)) {
                if (movePosition == "LEFT") {
                    return this.pieceMap[userInput.clickedElt.index] - 9;
                }
                else {
                    return this.pieceMap[userInput.clickedElt.index] - 7;
                }
            }
            else if ((userInput.clickedElt.color == checkersModel.CheckerColor.White && isForward) ||
                (userInput.clickedElt.color == checkersModel.CheckerColor.Red && !isForward)) {
                if (movePosition == "LEFT") {
                    return this.pieceMap[userInput.clickedElt.index] + 7;
                }
                else {
                    return this.pieceMap[userInput.clickedElt.index] + 9;
                }
            }
        }
    }
}