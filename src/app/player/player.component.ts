import { Component } from '@angular/core';
import { ControllerService } from '../controller.service';
import { Player } from './player.model';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  constructor(private controllerService: ControllerService){}
  players: Player[] = [];
  currentPlayer: any;
  diceNum: number = 0;
  isWinner: boolean = false;
  winner: any;
  newGame : boolean = this.controllerService.newGame;
  
  // visibility: boolean = this.currentPlayer;
  ngOnInit() {
    this.players = this.controllerService.players;
    this.currentPlayer = this.players[0];
    this.controllerService.winningEvent.subscribe((player) => {
      this.isWinner = true;
      this.winner = player;
      this.currentPlayer = undefined;
      this.newGame = true;
    });
  }

  // ngOnChange(){
  //   this.currentPlayer = this.controllerService.currentPlayer;
  // }
  diceNumber: any;
  rollDice(){
    this.diceNum = this.controllerService.rollDice();
    this.diceNumber = this.diceNum;
    this.controllerService.updatePosition(this.currentPlayer, this.diceNum);
    this.currentPlayer = this.controllerService.currentPlayer;
    this.diceNum = 0;
  }

  startNewGame(){
    this.isWinner = false;
    this.newGame = false;
    this.diceNum = 0;
    this.controllerService.startNewGame();
    this.currentPlayer = this.controllerService.currentPlayer;
  }
}
