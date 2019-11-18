import { Subject } from 'rxjs';

export class GameServiceStub {
    gameTime: number;
    gameStarted: Subject<boolean> = new Subject();
    setTime = (time) => {this.gameTime = time};
    get time(): number {
        return this.gameTime;
    }
}