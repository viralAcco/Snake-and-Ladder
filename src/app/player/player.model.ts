export class Player{
    public updatedPosition : number;
    public currentPosition : number;
    
    constructor(public name : string, public playerNumber:string){
        this.updatedPosition = this.currentPosition = 0;
    }
}