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
      let j = 0;
      let currentPos: any;
      this.players.forEach(function(player){
        let updatePos = document.getElementById("p"+player.updatedPosition);
        let currentPos = document.getElementById("p"+player.currentPosition);

        console.log(player.updatedPosition +" -- " +player.currentPosition);
        // let piece = document.createElement("img");
        if(j === 0){
          currentPos?.classList.remove("blue");
          updatePos?.classList.add("blue");
          // piece.setAttribute('src', 'pieces/blue.png');
          // piece.setAttribute('alt', 'p1');
        }else if(j === 1){
          currentPos?.classList.remove("red");
          updatePos?.classList.add("red");
          // piece.setAttribute('src', 'pieces/red.png');
          // piece.setAttribute('alt', 'p2');
        }else if(j === 2){
          currentPos?.classList.remove("green");
          updatePos?.classList.add("green");
          // piece.setAttribute('src', 'pieces/green.png');
          // piece.setAttribute('alt', 'p3');
        }else{
          currentPos?.classList.remove("purple");
          updatePos?.classList.add("purple");
          // piece.setAttribute('src', 'pieces/purple.png');
          // piece.setAttribute('alt', 'p4');
        }
        // piece.setAttribute('height', '20'); // 👈️ height in px
        // piece.setAttribute('width', '10');
        // updatePos?.appendChild(piece);
        j++;
      });
    });

    // let updatePlayer = document.getElementById("p"+this.players[0].updatedPosition);
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

  // ngOnChange(){
    
  // }
}
