import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = environment.API_URL;
  private isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLogged());
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  /**
   * Constructor del servicio.
   *
   * @param http Cliente HTTP
   */
  constructor(private http: HttpClient) { }

  /**
   * Registra a un usuario.
   *
   * @param name Nombre del usuario. Éste es el nombre con el cual se mostrará al usuario en la aplicación
   *              al resto de usuarios y a él mismo.
   * @param email Email del usuario. Usado para identificar al usuario en el login.
   * @param password Contraseña de usuario (sin encriptar).
   */
  registerUser(name: string, email: string, password: string): Observable<any> {
    const URL = this.authURL + 'register';
    const response = this.http.post<UserInterface>(
      URL,
      {name, email, password},
      {headers: this.headers}
    );
    return response.pipe(tap(data => {
      return data;
    }, catchError(error => {
      console.log(error);
      return throwError(error);
    })));
  }

  /**
   * Loguea a un usuario en el cliente de la aplicación.
   *
   * @param email Email de usuario. Sirve como identificador del logueo.
   * @param password Contraseña de usuario (sin encriptar)
   */
  loginUser(email: string, password: string): Observable<any> {
    const URL = this.authURL + 'login';
    const response = this.http.post<UserInterface>(
      this.authURL,
      { email, password },
      { headers: this.headers }
    );
    return response.pipe(tap(data => {
      localStorage.setItem('isLogged', 'true');
      this.isUserLoggedIn.next(true);
      return data;
    }), catchError(error => {
      console.log(error);
      return throwError(error);
    }));
  }

  /**
   * Fija una token de acceso para el usuario logueado en el cliente.
   *
   * @param token Token de acceso
   */
  setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  /**
   * Obtiene la token de acceso del cliente, o null si no ha sido obtenida.
   */
  getToken(): string {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken ? accessToken : null;
  }

  /**
   * Elimina la token de usuario y la flag de usuario conectado.
   */
  logoutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLogged');
  }

  /**
   * Comprueba si hay un usuario conectado en el cliente de la aplicación a través de la flag.
   */
  isLogged(): boolean {
    return localStorage.getItem('isLogged') === 'true';
  }
}
