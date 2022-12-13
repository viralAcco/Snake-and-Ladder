import { Board } from "./board";
import { Ladder } from "./ladder";
import { Snake } from "./snake";

export class BoardGenerator{
    private constructor(){}
    private static board : Board;
    public static addSnakesAndLadders(snakeMap? :Map<number, Snake> , ladderMap? : Map<number, Ladder>){
        if(this.board){
            return this.board;
        }
        snakeMap = snakeMap ? snakeMap : this.snakeMap();
        ladderMap = ladderMap ? ladderMap : this.ladderMap();
        
        let board : Board = new Board(snakeMap, ladderMap);
        return board;
    }
    private static ladderMap() : Map<number, Ladder>{
        let ladder1 : Ladder = new Ladder(3, 14);
        let ladder2 : Ladder = new Ladder(9, 31);
        let ladder3 : Ladder = new Ladder(20, 37);
        let ladder4 : Ladder = new Ladder(21, 42);
        let ladder5 : Ladder = new Ladder(28, 84);
        let ladder6 : Ladder = new Ladder(36, 57);
        let ladder7 : Ladder = new Ladder(51, 73);
        let ladder8 : Ladder = new Ladder(72, 92);
        let ladder9 : Ladder = new Ladder(80, 97);

        let ladderMap : Map<number, Ladder> = new Map<number, Ladder>();
        ladderMap.set(ladder1.startPoint, ladder1);
        ladderMap.set(ladder2.startPoint, ladder2);
        ladderMap.set(ladder3.startPoint, ladder3);
        ladderMap.set(ladder4.startPoint, ladder4);
        ladderMap.set(ladder5.startPoint, ladder5);
        ladderMap.set(ladder6.startPoint, ladder6);
        ladderMap.set(ladder4.startPoint, ladder7);
        ladderMap.set(ladder5.startPoint, ladder8);
        ladderMap.set(ladder6.startPoint, ladder9);

        return ladderMap;
    }
    private static snakeMap() : Map<number, Snake>{
        let snake1 : Snake = new Snake(25, 2);
        let snake2 : Snake = new Snake(47, 26);
        let snake3 : Snake = new Snake(49, 11);
        let snake4 : Snake = new Snake(58, 41);
        let snake5 : Snake = new Snake(61, 19);
        let snake6 : Snake = new Snake(86, 24);
        let snake7 : Snake = new Snake(93, 74);
        let snake8 : Snake = new Snake(95, 76);
        let snake9 : Snake = new Snake(98, 35);

        let snakeMap : Map<number, Snake> = new Map<number, Snake>();
        snakeMap.set(snake1.snakeHead, snake1);
        snakeMap.set(snake2.snakeHead, snake2);
        snakeMap.set(snake3.snakeHead, snake3);
        snakeMap.set(snake4.snakeHead, snake4);
        snakeMap.set(snake5.snakeHead, snake5);
        snakeMap.set(snake6.snakeHead, snake6);
        snakeMap.set(snake7.snakeHead, snake7);
        snakeMap.set(snake8.snakeHead, snake8);
        snakeMap.set(snake9.snakeHead, snake9);
        return snakeMap;
    }
}