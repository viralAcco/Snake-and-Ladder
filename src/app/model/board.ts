import { Ladder } from "./ladder";
import { Snake } from "./snake";

export class Board{
    constructor(public snakeMap : Map<number, Snake>,
                public ladderMap : Map<number, Ladder>){}
}