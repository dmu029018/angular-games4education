import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameListComponent } from './game-list/game-list.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { AppRoutingModule } from '../app-routing.module';
import { CommonsModule } from '../commons/commons.module';

@NgModule({
  declarations: [GameListComponent, GameDetailsComponent, GamePlayComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    CommonsModule
  ],
  exports: [GameDetailsComponent, GamePlayComponent]
})
export class GamesModule { }
