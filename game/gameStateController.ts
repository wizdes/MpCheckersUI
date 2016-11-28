/// <reference path="checkersModel.ts" />
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

    	GetActionApplyStateChange(){

    	}

    }
}