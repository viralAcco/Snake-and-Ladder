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
  playerEvent : EventEmitter<Player> = new EventEmitter();
  currentPlayer: any;
  newGame: boolean = false;

  constructor() {
    this.board = BoardGenerator.addSnakesAndLadders();
    this.totalPlayers();
  }
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
    location.reload();
  }

  t: number = 0;
  nextPlayer(){
    if(this.t === this.players.length-1){
      this.t = -1;
    }
    this.currentPlayer = this.players[++this.t];
    return this.currentPlayer;
  }
  previousPosition : any;
  updatePosition(player: Player, diceNum: number){
    player.updatedPosition = this.getUpdatedPosition(player, diceNum); 
    // console.log(player.updatedPosition);
    // player.updatedPosition = 100;
    if(player.updatedPosition > 100){
      player.updatedPosition = player.currentPosition;
      this.playerEvent.emit(player);
      this.currentPlayer = this.nextPlayer();
    }else if(player.updatedPosition === 100){
      this.newGame = true;
      player.previousPosition = player.currentPosition;
      this.winningEvent.emit(this.currentPlayer);
      this.playerEvent.emit(player);
    }else{
      player.previousPosition = player.currentPosition;
      player.currentPosition = player.updatedPosition;
      // console.log(player.updatedPosition);
      this.playerEvent.emit(player);
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
}
