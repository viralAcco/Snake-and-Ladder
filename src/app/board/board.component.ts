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
  currentPlayer : any;
  ngOnInit() {
    this.controllerService.playerEvent.subscribe((player)=>{
      this.currentPlayer = player;

      let updatePos = document.getElementById("p"+this.currentPlayer.updatedPosition);
      if(this.currentPlayer.previousPosition !== 0){
        if(document.getElementById("p"+this.currentPlayer.previousPosition)){
          let t = document.getElementById("p"+this.currentPlayer.previousPosition);
          let n = t?.childElementCount;
          console.log(t?.childNodes[1].textContent === "");
          
          if(n){
            let i = 0;
            while(t?.childNodes[i].textContent !== ""){
              i++;
            }
            t?.removeChild(t?.childNodes[i]);
          }
        }
          // previousPos.innerHTML = this.currentPlayer.previousPosition < 10 ? "0"+this.currentPlayer.previousPosition : this.currentPlayer.previousPosition;
        
        }
      let piece = document.createElement("img");
      
      piece.setAttribute('height', '20'); 
      piece.setAttribute('width', '15');

      if(this.currentPlayer.playerNumber == 'Player-1'){
        piece.setAttribute('src', '/../assets/blue.png');
        piece.setAttribute('alt', 'p1');
      }else if(this.currentPlayer.playerNumber == 'Player-2'){
        piece.setAttribute('src', '/../assets/red.png');
        piece.setAttribute('alt', 'p2');
        piece.setAttribute('width', '12');
      }else if(this.currentPlayer.playerNumber == 'Player-3'){
        piece.setAttribute('src', '/../assets/green.png');
        piece.setAttribute('alt', 'p3');
      }else{
        piece.setAttribute('src', '/../assets/purple.png');
        piece.setAttribute('alt', 'p4');
      }
      updatePos?.appendChild(piece);
      // let j = 0;
      // this.currentPlayer.forEach(function(player){
      //   let updatePos = document.getElementById("p"+player.updatedPosition);
      //   let previousPos = document.getElementById("p"+player.previousPosition);

      //   // let piece = document.createElement("img");
      //   if(j === 0){
      //     previousPos?.classList.remove("blue");
      //     updatePos?.classList.add("blue");
      //     // piece.setAttribute('src', 'pieces/blue.png');
      //     // piece.setAttribute('alt', 'p1');
      //   }else if(j === 1){
      //     previousPos?.classList.remove("red");
      //     updatePos?.classList.add("red");
      //     // piece.setAttribute('src', 'pieces/red.png');
      //     // piece.setAttribute('alt', 'p2');
      //   }else if(j === 2){
      //     previousPos?.classList.remove("green");
      //     updatePos?.classList.add("green");
      //     // piece.setAttribute('src', 'pieces/green.png');
      //     // piece.setAttribute('alt', 'p3');
      //   }else{
      //     previousPos ?.classList.remove("purple");
      //     updatePos?.classList.add("purple");
      //     // piece.setAttribute('src', 'pieces/purple.png');
      //     // piece.setAttribute('alt', 'p4');
      //   }
      //   // piece.setAttribute('height', '20'); // 
      //   // piece.setAttribute('width', '10');
      //   // updatePos?.appendChild(piece);
      //   j++;
      // });
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
