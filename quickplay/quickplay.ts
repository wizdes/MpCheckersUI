/// <reference path="../view/gameView.ts"/>
/// <reference path="../input/checkersInput.ts" />
/// <reference path="../app.ts" />
/// <reference path="../game/gameStateController.ts" />
namespace State {
    export class QuickPlayGame extends Phaser.State {
        view: gameView.mainGameView;
        userInput: CheckersInput.UserInput;
        gameState: GameStateController.QuickGameState; 

        constructor() {
            super();
            this.view = new gameView.mainGameView(this);
            this.userInput = new CheckersInput.UserInput();
            this.gameState = new GameStateController.QuickGameState();
        }

        create() {
            this.view.create();
        }

        update() {
            if (this.view.isPaused) {

            }
        }

        AddAction(action) {
            this.view.handleAction(action);
        }
    }
}