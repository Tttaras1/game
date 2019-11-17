import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { GameService } from './game.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [GameComponent, GameSettingsComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    GameRoutingModule,
    SharedModule
  ],
  providers: [
    GameService
  ]
})
export class GameModule { }
