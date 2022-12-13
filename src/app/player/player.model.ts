export class Player{
    public updatedPosition : number;
    public currentPosition : number;
    public previousPosition: number;
    
    constructor(public name : string, public playerNumber:string){
        this.updatedPosition = this.currentPosition = this.previousPosition = 0;
    }
}