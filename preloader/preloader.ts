/// <reference path="../app.ts" />
namespace MpCheckers.State {
    export class Preloader extends Phaser.State {
        loadingBar: Entity.PreloadBar;

        preload() {
            this.loadingBar = new Entity.PreloadBar(this.game);

            this.load.image("black", "assets/black.png");
            this.load.image("white", "assets/white.png");
            this.load.spritesheet("wood", "assets/wood.png", 36, 36);
            this.load.spritesheet("checker", "assets/checker.png", 36, 36);
        }

        create() {
            this.loadingBar.setFillPercent(100);
            var tween = this.game.add.tween(this.loadingBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);

            // loading screen will have a white background
            this.game.stage.backgroundColor = '#000';

            this.game.add.text(500, 200, "EUCHRE!", { font: '60px dimboregular', fill: '#000' });

            // scaling options
            // this makes it scale to the screen
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            tween.onComplete.add(this.startGame, this);
        }

        startGame() {
            this.game.state.start('menu', true);
        }

        loadUpdate() {
            this.loadingBar.setFillPercent(this.load.progress);
        }
    }
}
