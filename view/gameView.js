/// <reference path="../dep/phaser.d.ts" />
/// <reference path="../game/checkersModel.ts" />
/// <reference path="../input/checkersInput.ts" />
var gameView;
(function (gameView) {
    var mainGameView = (function () {
        function mainGameView(currentGame) {
            this.game = currentGame;
            this.boardStartX = 100;
            this.boardStartY = 300;
            this.boardScale = 2.5;
            this.isPaused = false;
            this.highlightedPieces = new Array();
            this.checkersPieces = {};
        }
        mainGameView.prototype.create = function () {
            this.drawBoard();
            this.drawBoardBorder();
            this.drawCheckerPieces();
        };
        mainGameView.prototype.drawBoard = function () {
            for (var i = 0; i < 8; i++) {
                for (var j = 0; j < 8; j++) {
                    var sprite = this.game.add.sprite(this.boardStartX + i * 31 * this.boardScale, this.boardStartY + j * 31 * this.boardScale, 'wood');
                    sprite.frame = (i + j) % 2 == 0 ? 0 : 15;
                    sprite.scale.setTo(this.boardScale, this.boardScale);
                }
            }
        };
        mainGameView.prototype.drawBoardBorder = function () {
            // for y - 31, x -> x + i * 31
            for (var i = 0; i < 8; i++) {
                var sprite_1 = this.game.add.sprite(this.boardStartX + i * 31 * this.boardScale, this.boardStartY - 31 * this.boardScale, 'wood');
                sprite_1.frame = 3;
                sprite_1.scale.setTo(this.boardScale, this.boardScale);
            }
            for (var i = 0; i < 8; i++) {
                var sprite_2 = this.game.add.sprite(this.boardStartX - 31 * this.boardScale, this.boardStartY + i * 31 * this.boardScale, 'wood');
                sprite_2.frame = 9;
                sprite_2.scale.setTo(this.boardScale, this.boardScale);
            }
            for (var i = 0; i < 8; i++) {
                var sprite_3 = this.game.add.sprite(this.boardStartX + i * 31 * this.boardScale, this.boardStartY + 8 * 31 * this.boardScale, 'wood');
                sprite_3.frame = 17;
                sprite_3.scale.setTo(this.boardScale, this.boardScale);
            }
            for (var i = 0; i < 8; i++) {
                var sprite_4 = this.game.add.sprite(this.boardStartX + 8 * 31 * this.boardScale, this.boardStartY + i * 31 * this.boardScale, 'wood');
                sprite_4.frame = 11;
                sprite_4.scale.setTo(this.boardScale, this.boardScale);
            }
            var sprite = this.game.add.sprite(this.boardStartX - 31 * this.boardScale, this.boardStartY - 31 * this.boardScale, 'wood');
            sprite.frame = 2;
            sprite.scale.setTo(this.boardScale, this.boardScale);
            sprite = this.game.add.sprite(this.boardStartX + 8 * 31 * this.boardScale, this.boardStartY - 31 * this.boardScale, 'wood');
            sprite.frame = 4;
            sprite.scale.setTo(this.boardScale, this.boardScale);
            sprite = this.game.add.sprite(this.boardStartX - 31 * this.boardScale, this.boardStartY + 8 * 31 * this.boardScale, 'wood');
            sprite.frame = 16;
            sprite.scale.setTo(this.boardScale, this.boardScale);
            sprite = this.game.add.sprite(this.boardStartX + 8 * 31 * this.boardScale, this.boardStartY + 8 * 31 * this.boardScale, 'wood');
            sprite.frame = 18;
            sprite.scale.setTo(this.boardScale, this.boardScale);
        };
        mainGameView.prototype.drawCheckerPieces = function () {
            var topList = [1, 3, 5, 7, 8, 10, 12, 14, 17, 19, 21, 23];
            var bottomList = [40, 42, 44, 46, 49, 51, 53, 55, 56, 58, 60, 62];
            for (var i = 0; i < 12; i++) {
                var boardCoord = this.getBoardCoord(topList[i]);
                var sprite = this.game.add.sprite(this.boardStartX + (boardCoord[0]) * 31 * this.boardScale, this.boardStartY + (boardCoord[1]) * 31 * this.boardScale, 'checker');
                sprite.frame = 4;
                sprite.scale.setTo(this.boardScale, this.boardScale);
                sprite.inputEnabled = true;
                // TODO: keep the sprites in memory, and have an interface from gameView.ts to access the sprites
                // inside the input class, reference this interface and assign the handleUserInput
                // to each of the sprite's events
                sprite.events.onInputDown.add(this.game.userInput.handleUserInput, {
                    clickedElt: new checkersModel.Checker(i, checkersModel.CheckerColor.White, checkersModel.ElementType.CheckPiece, topList[i]),
                    game: this.game
                });
                this.checkersPieces[i] = sprite;
            }
            for (var i = 0; i < 12; i++) {
                var boardCoord = this.getBoardCoord(bottomList[i]);
                var sprite = this.game.add.sprite(this.boardStartX + (boardCoord[0]) * 31 * this.boardScale, this.boardStartY + (boardCoord[1]) * 31 * this.boardScale, 'checker');
                sprite.frame = 5;
                sprite.scale.setTo(this.boardScale, this.boardScale);
                sprite.inputEnabled = true;
                sprite.events.onInputDown.add(this.game.userInput.handleUserInput, {
                    clickedElt: new checkersModel.Checker(12 + i, checkersModel.CheckerColor.Red, checkersModel.ElementType.CheckPiece, bottomList[i]),
                    game: this.game
                });
                this.checkersPieces[12 + i] = sprite;
            }
        };
        // gets a Tuple of 'x', 'y'
        mainGameView.prototype.getBoardCoord = function (position) {
            return [position % 8, Math.floor(position / 8)];
        };
        mainGameView.prototype.handleAction = function (action) {
            if (action instanceof checkersModel.CheckersEmptyMove) {
            }
            else if (action instanceof checkersModel.CheckersActionMove) {
                var moveAction = action;
                var sprite = this.checkersPieces[moveAction.clickedElt.index];
                // might do this every turn
                while (this.highlightedPieces.length > 0) {
                    var spriteToRemove = this.highlightedPieces[0];
                    this.highlightedPieces.splice(0, 1);
                    spriteToRemove.destroy();
                }
                var boardCoord = this.getBoardCoord(moveAction.finalPosition);
                sprite.x = this.boardStartX + (boardCoord[0]) * 31 * this.boardScale;
                sprite.y = this.boardStartY + (boardCoord[1]) * 31 * this.boardScale;
                sprite.events.onInputDown.removeAll();
                sprite.events.onInputDown.add(this.game.userInput.handleUserInput, {
                    clickedElt: new checkersModel.Checker(moveAction.clickedElt.index, moveAction.clickedElt.color, checkersModel.ElementType.CheckPiece, moveAction.finalPosition),
                    game: this.game
                });
                this.checkersPieces[moveAction.finalPosition] = sprite;
                delete this.checkersPieces[moveAction.initPosition];
            }
            else if (action instanceof checkersModel.CheckersActionHighlightMove) {
                var highlightAction = action;
                while (this.highlightedPieces.length > 0) {
                    var spriteToRemove = this.highlightedPieces[0];
                    this.highlightedPieces.splice(0, 1);
                    spriteToRemove.destroy();
                }
                for (var i = 0; i < highlightAction.boardElementsToHighlight.length; i++) {
                    var boardCoord = this.getBoardCoord(highlightAction.boardElementsToHighlight[i]);
                    var sprite = this.game.add.sprite(this.boardStartX + (boardCoord[0]) * 31 * this.boardScale, this.boardStartY + (boardCoord[1]) * 31 * this.boardScale, 'wood');
                    sprite.frame = 8;
                    sprite.scale.setTo(this.boardScale, this.boardScale);
                    sprite.inputEnabled = true;
                    sprite.events.onInputDown.add(this.game.userInput.handleUserInput, {
                        clickedElt: new checkersModel.Checker(highlightAction.clickedElt.index, highlightAction.clickedElt.color, checkersModel.ElementType.BoardPiece, highlightAction.boardElementsToHighlight[i]),
                        game: this.game,
                        refElt: highlightAction.clickedElt
                    });
                    this.highlightedPieces.push(sprite);
                }
            }
        };
        return mainGameView;
    }());
    gameView.mainGameView = mainGameView;
})(gameView || (gameView = {}));
//# sourceMappingURL=gameView.js.map