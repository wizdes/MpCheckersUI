﻿module CheckersInput {
    export class UserInput {
        game;
        clickedElt;

        handleUserInput() {
            this.game.AddAction(this.game.gameState.GetActionApplyStateChange(this));
        }
    }
}