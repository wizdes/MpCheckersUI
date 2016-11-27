/// <reference path="../game/checkersModel.ts" />
/// <reference path="../input/checkersInput.ts" />
namespace gameView {
    export class mainGameView {
        game;
        isPaused;

        constructor(currentGame) {
            this.game = currentGame;
            this.boardStartX = 170;
            this.boardStartY = 700;
            this.boardScale = 2.5;
            this.isPaused = false;
        }

        create() {
            this.drawBoard();
            this.drawBoardBorder();
            this.drawCheckerPieces();
        }

        drawBoard() {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    let sprite = this.game.add.sprite(
                        this.boardStartX + i * 31 * this.boardScale,
                        this.boardStartY + j * 31 * this.boardScale,
                        'wood');

                    sprite.frame = (i + j) % 2 == 0 ? 0 : 15;
                    sprite.scale.setTo(this.boardScale, this.boardScale);
                }
            }
        }

        drawBoardBorder() {
            // for y - 31, x -> x + i * 31
            for (let i = 0; i < 8; i++) {
                let sprite = this.game.add.sprite(
                    this.boardStartX + i * 31 * this.boardScale,
                    this.boardStartY - 31 * this.boardScale,
                    'wood');

                sprite.frame = 3;
                sprite.scale.setTo(this.boardScale, this.boardScale);
            }

            for (let i = 0; i < 8; i++) {
                let sprite = this.game.add.sprite(
                    this.boardStartX - 31 * this.boardScale,
                    this.boardStartY + i * 31 * this.boardScale,
                    'wood');

                sprite.frame = 9;
                sprite.scale.setTo(this.boardScale, this.boardScale);
            }

            for (let i = 0; i < 8; i++) {
                let sprite = this.game.add.sprite(
                    this.boardStartX + i * 31 * this.boardScale,
                    this.boardStartY + 8 * 31 * this.boardScale,
                    'wood');

                sprite.frame = 17;
                sprite.scale.setTo(this.boardScale, this.boardScale);
            }

            for (let i = 0; i < 8; i++) {
                let sprite = this.game.add.sprite(
                    this.boardStartX + 8 * 31 * this.boardScale,
                    this.boardStartY + i * 31 * this.boardScale,
                    'wood');

                sprite.frame = 11;
                sprite.scale.setTo(this.boardScale, this.boardScale);
            }

            let sprite = this.game.add.sprite(
                this.boardStartX - 31 * this.boardScale,
                this.boardStartY - 31 * this.boardScale,
                'wood');
            sprite.frame = 2;
            sprite.scale.setTo(this.boardScale, this.boardScale);

            sprite = this.game.add.sprite(
                this.boardStartX + 8 * 31 * this.boardScale,
                this.boardStartY - 31 * this.boardScale,
                'wood');
            sprite.frame = 4;
            sprite.scale.setTo(this.boardScale, this.boardScale);

            sprite = this.game.add.sprite(
                this.boardStartX - 31 * this.boardScale,
                this.boardStartY + 8 * 31 * this.boardScale,
                'wood');
            sprite.frame = 16;
            sprite.scale.setTo(this.boardScale, this.boardScale);

            sprite = this.game.add.sprite(
                this.boardStartX + 8 * 31 * this.boardScale,
                this.boardStartY + 8 * 31 * this.boardScale,
                'wood');
            sprite.frame = 18;
            sprite.scale.setTo(this.boardScale, this.boardScale);
        }

        drawCheckerPieces() {
            let topList: Array<number> = [1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23];
            let bottomList: Array<number> = [40, 42, 44, 46, 49, 51, 53, 55, 56, 58, 60, 62];

            for (let i = 0; i < 12; i++) {
                let boardCoord = this.getBoardCoord(topList[i]);
                let sprite = this.game.add.sprite(
                    this.boardStartX + (boardCoord[0]) * 31 * this.boardScale,
                    this.boardStartY + (boardCoord[1]) * 31 * this.boardScale,
                    'checker');
                sprite.frame = 4;
                sprite.scale.setTo(this.boardScale, this.boardScale);
                sprite.inputEnabled = true;
                sprite.events.onInputDown.add(this.game.userInput.handleUserInput, {
                    pieceIndex: new checkersModel.Checker(i, checkersModel.CheckerColor.Red),
                    game: this.game
                });
            }

            for (let i = 0; i < 12; i++) {
                let boardCoord = this.getBoardCoord(bottomList[i]);
                let sprite = this.game.add.sprite(
                    this.boardStartX + (boardCoord[0]) * 31 * this.boardScale,
                    this.boardStartY + (boardCoord[1]) * 31 * this.boardScale,
                    'checker');
                sprite.frame = 5;
                sprite.scale.setTo(this.boardScale, this.boardScale);
            }
        }

        getBoardCoord(position: number) {
            return [position % 8, Math.floor(position / 8)];
        }

        private boardScale: number;
        private boardStartX: number;
        private boardStartY: number;

    }
}