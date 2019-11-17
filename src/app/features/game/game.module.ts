import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameRoutingComponent } from './game-routing.module';



@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    GameRoutingComponent
  ]
})
export class GameModule { }
