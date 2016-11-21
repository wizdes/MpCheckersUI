/// <reference path="../app.ts" />
namespace MpCheckers.State {
    export class QuickPlayGame extends Phaser.State {
    	var scale = 2.5;

    	preload() {

        }

        create() {
        	drawBoard();
        	drawBoardBorder();
        	drawCheckerPieces();
        }

        drawBoard(){
        	for(var i = 0; i < 8; i++){
        		for(var j = 0; j < 8; j++){
        			var sprite = this.game.add.sprite(150 + i * 31 * scale, 700 + j * 31 * scale, 'wood');
        			sprite.frame = (i + j)%2 == 0 ? 0 : 15;
        			sprite.scale.setTo(scale, scale);
        		}
        	}
        }

        drawBoardBorder(){
        	
        	

        }

        drawCheckerPieces(){

        }
    }
}