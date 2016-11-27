module checkersModel {
    export enum CheckerColor {
        Red = 1,
        White,
        Black
    }
    export class Checker{
        index;
        color: CheckerColor;

        constructor(index, color) {
            this.index = index;
            this.color = color;
        }
    }
}