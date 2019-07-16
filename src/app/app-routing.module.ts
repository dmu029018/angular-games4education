import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './commons/home/home.component';
import { GameListComponent } from './games/game-list/game-list.component';
import { NotfoundComponent } from './commons/notfound/notfound.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { GameDetailsComponent } from './games/game-details/game-details.component';
import { GamePlayComponent } from './games/game-play/game-play.component';
import { AuthGuard } from './shared/guards/auth.guard';

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
    component: GameListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'games/:id',
    component: GameDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'games/:id/play',
    component: GamePlayComponent,
    canActivate: [AuthGuard]
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
