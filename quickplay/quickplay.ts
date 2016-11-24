/// <reference path="../app.ts" />
namespace MpCheckers.State {
    export class QuickPlayGame extends Phaser.State {
    	constructor(){
    		super();
    		this.boardStartX = 170;
    		this.boardStartY = 700;
    		this.boardScale = 2.5;
    	}

    	preload() {

        }

        create() {
        	this.drawBoard();
        	this.drawBoardBorder();
        	//this.drawCheckerPieces();
        }

        drawBoard(){
        	for(let i = 0; i < 8; i++){
        		for(let j = 0; j < 8; j++){
        			let sprite = this.game.add.sprite(
	        			this.boardStartX + i * 31 * this.boardScale,
	        			this.boardStartY + j * 31 * this.boardScale,
	        			'wood');

        			sprite.frame = (i + j)%2 == 0 ? 0 : 15;
        			sprite.scale.setTo(this.boardScale, this.boardScale);
        		}
        	}
        }

        drawBoardBorder(){
        	// for y - 31, x -> x + i * 31
        	for(let i = 0; i < 8; i++){
    			let sprite = this.game.add.sprite(
        			this.boardStartX + i * 31 * this.boardScale,
        			this.boardStartY - 31 * this.boardScale,
        			'wood');

    			sprite.frame = 3;
    			sprite.scale.setTo(this.boardScale, this.boardScale);
    		}        		

        	for(let i = 0; i < 8; i++){
    			let sprite = this.game.add.sprite(
        			this.boardStartX - 31 * this.boardScale,
        			this.boardStartY + i * 31 * this.boardScale,
        			'wood');

    			sprite.frame = 9;
    			sprite.scale.setTo(this.boardScale, this.boardScale);
    		}  

    		for(let i = 0; i < 8; i++){
    			let sprite = this.game.add.sprite(
        			this.boardStartX + i * 31 * this.boardScale,
        			this.boardStartY + 8 * 31 * this.boardScale,
        			'wood');

    			sprite.frame = 17;
    			sprite.scale.setTo(this.boardScale, this.boardScale);
    		}  

        	for(let i = 0; i < 8; i++){
    			let sprite = this.game.add.sprite(
        			this.boardStartX + 8 * 31 * this.boardScale,
        			this.boardStartY + i * 31 * this.boardScale,
        			'wood');

    			sprite.frame = 11;
    			sprite.scale.setTo(this.boardScale, this.boardScale);
    		}  
        }

        drawCheckerPieces(){

        }

        private boardScale : number;
    	private boardStartX : number;
    	private boardStartY : number;
    }
}