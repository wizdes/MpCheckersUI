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

                    if (!this.isBorderPosition(this.pieceMap[userInput.clickedElt.index], "RIGHT")) {
                        let val = this.GetMove(userInput, "RIGHT", true);
                        let isPotentialEaten = this.hasPiece(val, potentialEaten);

                        if (!isPotentialEaten) {
                            action.boardElementsToHighlight.push(val);
                        }
                    }

                    if (!this.isBorderPosition(this.pieceMap[userInput.clickedElt.index], "LEFT")) {
                        let val = this.GetMove(userInput, "LEFT", true);
                        let isPotentialEaten = this.hasPiece(val, potentialEaten);

                        if (!isPotentialEaten) {
                            action.boardElementsToHighlight.push(val);
                        }
                    }

                    // do the potentialEaten logic
                    for (let i = 0; i < potentialEaten.length; i++) {
                        let beginPosition = this.pieceMap[userInput.clickedElt.index];
                        let endPiecePosition = this.pieceMap[potentialEaten[i]];
                        let diff = endPiecePosition - beginPosition;

                        if (!this.isBorderPosition(endPiecePosition, "BOTH") &&
                            !this.hasPiece(endPiecePosition + diff, null) &&
                            !this.isSameColor(userInput.clickedElt.color, potentialEaten[i])) {
                            action.boardElementsToHighlight.push(endPiecePosition + diff);
                            if (action.capturedUnits == null) {
                                action.capturedUnits = [];
                            }

                            action.capturedUnits.push([endPiecePosition + diff, potentialEaten[i]]);
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
                action.removePieceIndex = userInput.capturedUnit;
                this.pieceMap[userInput.capturedUnit] = -1;
                this.pieceMap[userInput.refElt.index] = userInput.clickedElt.highlightBoardPosition;

                return action;
            }

            return new checkersModel.CheckersEmptyMove();
        }

        isBorderPosition(position: number, side: string) {
            if (side == "LEFT") {
                if (this.nogoLeft.indexOf(position) == -1) {
                    return false;
                }

                return true;
            }
            else if (side == "RIGHT") {
                if (this.nogoRight.indexOf(position) == -1) {
                    return false;
                }

                return true;
            }
            else if (side == "BOTH") {
                if (this.nogoRight.indexOf(position) == -1 && this.nogoLeft.indexOf(position) == -1) {
                    return false;
                }

                return true;
            }

            return false;
        }

        isSameColor(color, index: number) {
            let indexColor = this.getColorFromIndex(index);

            if (color == indexColor) return true;

            return false;
        }

        getColorFromIndex(index: number) {
            if (index < 12) {
                return checkersModel.CheckerColor.White;
            }

            return checkersModel.CheckerColor.Red;
        }

        hasPiece(position: number, potentialEaten) {
            for (let i = 0; i < 24; i++) {
                if (this.pieceMap[i] == position) {
                    if (potentialEaten != null) {
                        potentialEaten.push(i);
                    }

                    return true;
                }
            }

            return false;
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