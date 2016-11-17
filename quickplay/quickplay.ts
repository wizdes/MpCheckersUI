/// <reference path="../app.ts" />
namespace MpCheckers.State {
    export class QuickPlayGame extends Phaser.State {
        preload() {
        }

        create() {
            var sprite = this.game.add.sprite(150, 700, 'wood');
            sprite.frame = 0;
        }
    }
}