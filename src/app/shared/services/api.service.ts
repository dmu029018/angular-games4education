import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GAMES } from '../mock-data/games-mock';
import { Game } from '../classes/game';
import { environment } from 'src/environments/environment';
import { GamePlay } from '../classes/game-play';
import { User } from '../classes/user';
import { GAMEPLAYS } from '../mock-data/gameplays-mock';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = environment.API_URL;

  constructor(private http: HttpClient) { }

  // GAMES

  getGames$() {

    return this.http.get(this.apiURL + 'games');
  }

  getGame$(identifier: string) {
    return this.http.get<Game>(this.apiURL + 'games/' + identifier);
  }

  // USER DATA

  getUserData$(identifier: string) {
    return this.http.get<User>(this.apiURL + 'users/' + identifier);
  }


  // IMPLEMENT

  // GAMEPLAY


  postGameplay$(gameId, userId, score, grade) {
    const gameplay: GamePlay = new GamePlay(gameId, userId, score, grade);

  }

  getGameplay$() {

    //return this.http.get(this.apiURL + 'gameplays');
  }

  getGameplays$(identifier: string) {

    //return this.http.get<GamePlay>(this.apiURL + 'gameplays/' + identifier);
  }

  getGameplays4game$(gameIdent: string) {
    return GAMEPLAYS.filter(gp => gp.gameId === gameIdent);
  }

  getGameplays4user$(userIdent: string) {
    console.log(userIdent);

    return GAMEPLAYS.filter(gp => gp.userId === userIdent);
    //return this.http.get<Game>(this.apiURL + 'games/' + identifier);
  }

  getBestGameplay4game$(gameIdent: string) {
    const gameplays = GAMEPLAYS.filter(gp => gp.gameId === gameIdent);
    Math.max.apply(Math, gameplays.map(gp => gp));
  }


  getBestGameplay4gameAndPlayer$(gameIdent: string, playerIdent) {

  }
}
