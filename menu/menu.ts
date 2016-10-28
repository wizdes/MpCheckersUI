/// <reference path="../app.ts" />
namespace MpCheckers.State {
    export class Menu extends Phaser.State {

        preload() {
        }

        create() {
            //loading screen will have a white background
            this.game.stage.backgroundColor = '#5F9C73';
            // how to set background image?

            this.game.add.text(260, 160, "EUCHRE!", { font: '140px dimboregular', fill: '#000' });

            var startLabel = this.game.add.text(570, 700, "Start", { font: '55px dimboregular', fill: '#000' });
            startLabel.inputEnabled = true;
            startLabel.events.onInputDown.add(this.playGame);

            this.game.add.sprite(150, 700, 'icon');
        }

        playGame(event) {
            event.game.state.start('quickgame', true);
        }
    }
}
