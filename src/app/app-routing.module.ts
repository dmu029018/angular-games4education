import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './commons/home/home.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { NotfoundComponent } from './commons/notfound/notfound.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { GameDetailsComponent } from './games/game-details/game-details.component';
import { GamePlayComponent } from './games/game-play/game-play.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'games',
    component: GameListComponent
  },
  {
    path: 'games/:id',
    component: GameDetailsComponent
  },
  {
    path: 'games/:id/play',
    component: GamePlayComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
