module CheckersInput {
    export class UserInput {
        game;
        clickedElt;
        refElt;
        capturedUnit;

        handleUserInput() {
            this.game.AddAction(this.game.gameState.GetActionApplyStateChange(this));
        }
    }
}