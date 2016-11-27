/// <reference path="quickplay/quickplay.ts" />
namespace MpCheckers {
    export class MainGame extends Phaser.Game {

        constructor() {
            super({
                width: 900,
                height: 1600,
                renderer: Phaser.AUTO
            });

            this.state.add('quickplaygame', State.QuickPlayGame);
            this.state.add('menu', State.Menu);
            this.state.add('preloader', State.Preloader, true);
        }
    }
}

// export Game to window
var Game = MpCheckers.MainGame;
var loadGame = new Game();