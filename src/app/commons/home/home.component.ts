import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { User } from 'src/app/shared/classes/user';
import { GamePlay } from 'src/app/shared/classes/game-play';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Comprueba si el usuario está logueado
  userIsLogged;
  // Usuario vacío para inicializar sin errores.
  // No tiene nada que ver con un usuario conectado a la aplicación
  user = new User('', '', '');
  gameplays: GamePlay[];
  totalScore = 0;

  /**
   * Constructor
   *
   * @param auth Servicio de autenticación
   * @param api API de datos
   * @param router Ruteador
   */
  constructor(private auth: AuthService, private api: ApiService, private router: Router) {}

  /**
   * Inicialización del componente
   */
  ngOnInit() {
    this.userIsLogged = this.auth.isLogged();
    if (this.userIsLogged) {
      this.api.getLoggedUser$().subscribe((u: User) => {
        this.user = u[0];
      });

      this.updateGameplayInfo();
    }
  }

  /**
   * Acciones al pulsar el botón de desconexión.
   */
  logout() {
    this.auth.logoutUser();
    this.userIsLogged = false;
    this.router.navigate(['/home']);
  }

  /**
   * Obtiene la información de las partidas del jugador y calcula su puntuación
   */
  updateGameplayInfo() {
    this.api.getGameplays4user$(localStorage.getItem('ident')).subscribe((gps: GamePlay[]) => {
      this.gameplays = gps;
      this.totalScore = this.gameplays.reduce((score, gp) => score + gp.score, 0);
    });
  }

}
