import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GAMES } from '../mock-data/games-mock';
import { Game } from '../classes/game';


@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  getGames$(): Game[] {
    // Por ahora importaremos del mock data, pero se hará con una API
    return GAMES;
  }

  findGameById(identifier: string): Game {
    for (let g of GAMES) {
      if (g.id === identifier) {
        return g;
      }
    }
    return null;
  }

}
