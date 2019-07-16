import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GAMES } from '../mock-data/games-mock';
import { Game } from '../classes/game';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getGames$() {

    return this.http.get(this.apiURL + 'games');
  }

  getGame$(identifier: string) {
    return this.http.get<Game>(this.apiURL + 'games/' + identifier);
  }

}
