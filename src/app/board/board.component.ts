import { Component } from '@angular/core';
import { ControllerService } from '../controller.service';
import { Board } from '../model/board';
import { BoardGenerator } from '../model/board-generator';
import { Player } from '../player/player.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  board: Board = BoardGenerator.addSnakesAndLadders();;
  constructor(private controllerService : ControllerService){}
  players : Player[] = [];
  ngOnInit() {
    this.controllerService.playerEvent.subscribe((players)=>{
      this.players = players;
    });
    let i = 1;
    this.board.snakeMap.forEach(function(value:any){
      let t = document.getElementById("p"+value.snakeHead);
      let tag = document.createElement("span");
      var text = document.createTextNode(" SH"+i);
      tag.appendChild(text);
      t?.appendChild(tag);
      t?.classList.add("snake");
      i++;
    });
    i = 1;
    this.board.snakeMap.forEach(function(value:any){
      let t = document.getElementById("p"+value.snakeTail);
      let tag = document.createElement("span");
      var text = document.createTextNode(" ST"+i);
      tag.appendChild(text);
      t?.appendChild(tag);
      t?.classList.add("snake");
      i++;
    });
    i = 1;
    this.board.ladderMap.forEach(function(value:any){
      let t = document.getElementById("p"+value.startPoint);
      let tag = document.createElement("span");
      var text = document.createTextNode(" LB"+i);
      tag.appendChild(text);
      t?.appendChild(tag);
      t?.classList.add("ladder");
      i++;
    });
    i = 1;
    this.board.ladderMap.forEach(function(value:any){
      let t = document.getElementById("p"+value.endPoint);
      let tag = document.createElement("span");
      var text = document.createTextNode(" LT"+i);
      tag.appendChild(text);
      t?.appendChild(tag);
      t?.classList.add("ladder");
      i++;
    });
  }
}
