module CheckersInput {
    export class UserInput {
        game;
        clickedElt;
        refElt;

        handleUserInput() {
            this.game.AddAction(this.game.gameState.GetActionApplyStateChange(this));
        }
    }
}