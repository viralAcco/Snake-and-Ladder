import { EventEmitter, Injectable } from '@angular/core';
import { Board } from './model/board';
import { BoardGenerator } from './model/board-generator';
import { Player } from './player/player.model';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  winner: any;
  players: Player[] = [];
  board: Board;
  winningEvent : EventEmitter<Player> = new EventEmitter();
  playerEvent : EventEmitter<Player[]> = new EventEmitter();
  currentPlayer: any;
  newGame: boolean = false;

  constructor() {
    this.board = BoardGenerator.addSnakesAndLadders();
    this.totalPlayers();
  }
  // boardPosition: number[][] = [

  //                      [1, 1], [2, 2], [3, 3], [4, 14], [5, 5], [6, 6], [7, 7], [8, 8], [9, 31], [10, 10],
  //                      [11, 11], [12, 12], [13, 13], [14, 14], [15, 15], [16, 16], [17, 17], [18, 18], [19, 19], [20, 37],
  //                      [21, 42], [22, 22], [23, 23], [24, 24], [25, 25], [26, 26], [27, 27], [28, 84], [29, 29], [30, 30],
  //                      [31, 31], [32, 32], [33, 33], [34, 34], [35, 35], [36, 57], [37, 37], [38, 38], [39, 39], [40, 40],
  //                      [41, 41], [42, 42], [43, 43], [44, 44], [45, 45], [46, 46], [47, 26], [48, 48], [49, 11], [50, 50],
  //                      [51, 73], [52, 52], [53, 53], [54, 54], [55, 55], [56, 56], [57, 57], [58, 41], [59, 59], [60, 60],
  //                      [61, 19], [62, 62], [63, 63], [64, 64], [65, 65], [66, 66], [67, 67], [68, 68], [69, 69], [70, 70],
  //                      [71, 71], [72, 92], [73, 73], [74, 74], [75, 75], [76, 76], [77, 77], [78, 78], [79, 79], [80, 97],
  //                      [81, 81], [82, 82], [83, 83], [84, 84], [85, 85], [86, 24], [87, 87], [88, 88], [89, 89], [90, 90],
  //                      [91, 91], [92, 92], [93, 73], [94, 94], [95, 76], [96, 96], [97, 97], [98, 35], [99, 99], [100, 100],

  //                     ];
  totalPlayers(){
    let player1 = new Player("Viral", "Player-1");
    let player2 = new Player("Prantik", "Player-2");
    let player3 = new Player("Manish", "Player-3");
    this.players = new Array<Player>();
    this.players.push(player1);
    this.players.push(player2);
    this.players.push(player3);
  }

  rollDice(){
    const diceValue =  Math.floor(Math.random() * 6) + 1;
    return diceValue;
  }

  startNewGame() {
    this.winner = undefined;
    this.currentPlayer = this.players[0];
    this.players.forEach(e=> {
      e.currentPosition = 0;
      e.updatedPosition = 0;
    });
  }

  t: number = 0;
  nextPlayer(){
    if(this.t === this.players.length-1){
      this.t = -1;
    }
    this.currentPlayer = this.players[++this.t];
    return this.currentPlayer;
  }

  updatePosition(player: Player, diceNum: number){
    player.updatedPosition = this.getUpdatedPosition(player, diceNum); 
    // console.log(player.updatedPosition);
    // player.updatedPosition = 100;
    if(player.updatedPosition > 100){
      player.updatedPosition = player.currentPosition;
      this.currentPlayer = this.nextPlayer();
    }else if(player.updatedPosition === 100){
      this.newGame = true;
      this.winningEvent.emit(this.currentPlayer);
    }else{
      player.currentPosition = player.updatedPosition;
      this.currentPlayer = this.nextPlayer();
    }
  }

  getUpdatedPosition(player: Player, diceNum: number){
    player.updatedPosition = player.currentPosition + diceNum;
    // console.log(player.updatedPosition);
    

    let snake: any;
    if(snake = this.isSnakeBite(player.updatedPosition)){
      return snake.snakeTail;
    }
    let ladder : any;
    if(ladder = this.isLadderFound(player.updatedPosition)){
      return ladder.endPoint;
    }
    return player.updatedPosition;
  }

  isSnakeBite(position : number){
    return this.board.snakeMap.get(position);
  }

  isLadderFound(position : number){
    return this.board.ladderMap.get(position);
  }

  updatePlayerEvent(){
    this.playerEvent.emit(this.players);
  }
}
