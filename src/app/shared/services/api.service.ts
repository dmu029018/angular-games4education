import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from '../classes/game';
import { environment } from 'src/environments/environment';
import { GamePlay } from '../classes/game-play';
import { User } from '../classes/user';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * URL base de la API. Viene dada por el entorno.
   */
  private apiURL = environment.API_URL;

  /**
   * Cabeceras HTTP
   */
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  /**
   * Constructor
   */
  constructor(private http: HttpClient) { }

  // GAMES

  /**
   * Obtiene todos los juegos existentes.
   */
  getGames$() {
    return this.http.get<Game[]>(this.apiURL + 'games');
  }

  /**
   * Obtiene una instancia de juego dado su identificador.
   *
   * @param identifier Identificador de juego
   */
  getGame$(identifier: string) {
    return this.http.get<Game>(this.apiURL + 'games/' + identifier);
  }

  // USER DATA

  /**
   * Obtiene la referencia de usuario logueado
   */
  getLoggedUser$() {
    return this.getUserData$(localStorage.getItem('ident'));
  }

  /**
   * Obtiene datos de usuario a partir de su id
   *
   * @param identifier Identificador de usuario
   */
  getUserData$(identifier: string) {
    return this.http.get<User>(this.apiURL + 'users?id=' + identifier);
  }

  // GAMEPLAY

  /**
   * Añade un registro de partida a la base de datos.
   *
   * @param gameplay Instancia de gameplay de la partida
   */
  postGameplay$(gameplay: GamePlay) {
    const url = this.apiURL + 'gameplays/';
    return this.http.post<GamePlay>(url, gameplay, {
      headers: this.headers
    }).pipe(tap((gp: GamePlay) => {
      console.log(`added gameplay: id=${gp.id}`);
    }), catchError(error => {
      console.log(error);
      return throwError(error);
    }));
  }

  /**
   * Obtiene un gameplay con un identificador determinado.
   *
   * @param ident Identificador del gameplay
   */
  getGameplay$(ident: string) {
    return this.http.get<GamePlay>(this.apiURL + 'gameplays?id=' + ident);
  }

  /**
   * Obtiene todos los gameplays existentes.
   */
  getGameplays$() {
    return this.http.get<GamePlay[]>(this.apiURL + 'gameplays/');
  }

  /**
   * Obtiene todos los gameplays de un juego.
   *
   * @param userIdent Identificador de usuario.
   */
  getGameplays4game$(gameIdent: string) {
    return this.http.get<GamePlay[]>(this.apiURL + 'gameplays?gameId=' + gameIdent);
  }

  /**
   * Obtiene todos los gameplays de un usuario.
   *
   * @param userIdent Identificador de usuario.
   */
  getGameplays4user$(userIdent: string) {
    return this.http.get<GamePlay[]>(this.apiURL + 'gameplays?userId=' + userIdent);
  }

  /**
   * Obtiene todos los gameplays de un usuario dado para un juego dado.
   */
  getGameplays4gameAnd4user$(gameIdent: string, userIdent: string) {
    return this.http.get<GamePlay[]>(this.apiURL + 'gameplays?gameId=' + gameIdent + '&userId=' + userIdent);
  }

}
