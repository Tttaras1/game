import { Subject } from 'rxjs';

export class GameService {
    public gameTime: number | null = null;
    public gameStarted: Subject<boolean> = new Subject();
    constructor(){}

    setTime(num: number): void {
        this.gameTime = num;
    }

    get time(): number {
        return this.gameTime;
    }
}