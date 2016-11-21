var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../app.ts" />
var MpCheckers;
(function (MpCheckers) {
    var State;
    (function (State) {
        var Preloader = (function (_super) {
            __extends(Preloader, _super);
            function Preloader() {
                _super.apply(this, arguments);
            }
            Preloader.prototype.preload = function () {
                this.loadingBar = new MpCheckers.Entity.PreloadBar(this.game);
                this.load.image("black", "assets/black.png");
                this.load.image("white", "assets/white.png");
                this.load.spritesheet("wood", "assets/wood.png", 36, 36);
                this.load.spritesheet("checker", "assets/checker.png", 36, 36);
            };
            Preloader.prototype.create = function () {
                this.loadingBar.setFillPercent(100);
                var tween = this.game.add.tween(this.loadingBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
                // loading screen will have a white background
                this.game.stage.backgroundColor = '#000';
                this.game.add.text(500, 200, "EUCHRE!", { font: '60px dimboregular', fill: '#000' });
                // scaling options
                // this makes it scale to the screen
                this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
                tween.onComplete.add(this.startGame, this);
            };
            Preloader.prototype.startGame = function () {
                this.game.state.start('menu', true);
            };
            Preloader.prototype.loadUpdate = function () {
                this.loadingBar.setFillPercent(this.load.progress);
            };
            return Preloader;
        }(Phaser.State));
        State.Preloader = Preloader;
    })(State = MpCheckers.State || (MpCheckers.State = {}));
})(MpCheckers || (MpCheckers = {}));
