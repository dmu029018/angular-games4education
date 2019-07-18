import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/shared/classes/game';
import { User } from 'src/app/shared/classes/user';
import { Grade } from 'src/app/shared/enums/grade.enum';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { GamePlay } from 'src/app/shared/classes/game-play';
import { GameBehavior } from 'src/app/shared/classes/game-behavior';
import { FactoryService } from 'src/app/shared/services/factory.service';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit {

  firstTime = true;
  identifier: string;
  game: Game = new Game();
  user: User = new User('', '', '');
  gameBehavior: GameBehavior;
  gamePlay: GamePlay = this.generateGamePlay();

  message: string = '';
  score: number = 0;
  time: number = 0;
  maxTime: number = 0;
  grade: Grade = Grade.E;
  gameIsRunning = false;
  gameInterval;
  messageTimeout;

  constructor(private route: ActivatedRoute, private api: ApiService, private factory: FactoryService) { }

  /**
   * Inicializador del componente
   */
  ngOnInit() {
    // Obtener identificador de juego de la ruta
    this.route.params.subscribe(p => this.identifier = p.id);
    // Obtener juego
    this.api.getGame$(this.identifier).subscribe(g => {
      this.game = g;
      // Obtener usuario
      this.api.getLoggedUser$().subscribe((u: User) => {
        this.user = u[0];
        // Se asume que al entrar en esta pantalla hay un usuario conectado
        this.gamePlay = this.generateGamePlay();
        // Importación dinámica de la clase de lógica de juego que se desee.
        this.gameBehavior = this.factory.createGameBehavior(this.game.script);
        this.gameBehavior.setGamePlay(this.gamePlay);

      });
    });
  }

  /**
   * Genera un nuevo objeto de partida.
   */
  generateGamePlay() {
      return new GamePlay(this.game.id, localStorage.getItem('ident'), 0, 0);
  }

  /**
   * Inicializa una nueva partida y arranca el flujo de juego.
   */
  gameInit() {
    this.gamePlay = this.generateGamePlay();
    this.gameBehavior.setGamePlay(this.gamePlay);
    this.message = '';
    this.gameIsRunning = true;
    // Intervalo de tiempo
    this.gameBehavior.onInit();
    this.gameInterval = setInterval(() => {
      this.timeElapse(50);
      if (this.gameBehavior.currentTime <= 0 || this.gameBehavior.isOver) {
        this.gameOver();
      }
    }, 50);

    this.firstTime = false;
  }


  /**
   * Hace pasar un tiempo dado en el temporizador.
   *
   * Usualmente solamente se utiliza en el inicializador,
   * al definir el intervalo de tiempo del juego,
   * pero se podría usar para penalizar al jugador en algún juego.
   *
   * @param ms Tiempo que pasa del temporizador en milisegundos.
   */
  timeElapse(ms: number) {
    this.gameBehavior.currentTime -= ms;
  }


  /**
   * Muestra un mensaje en el panel de mensajes.
   *
   * Si se está mostrando un mensaje en el momento de llamada, el mensaje anterior es
   * reemplazado por el nuevo.
   *
   * @param msg Mensaje a mostrar.
   * @param ms Tiempo en milisegundos durante el cual se muestra el mensaje.
   */
  showMessage(msg: string, ms?: number) {
    clearTimeout(this.messageTimeout);
    this.message = msg;
    if (ms) {
      this.messageTimeout = setTimeout(() => {
        this.message = '';
      }, ms);
    }
  }

  /**
   * Hace finalizar el juego y envía la puntuación de la partida.
   */
  gameOver() {
    clearInterval(this.gameInterval);
    // Enviar puntuación
    this.reportScore();
    // Detener flujo de juego
    this.gameIsRunning = false;
  }

  /**
   * Envía los resultados de la partida al servidor.
   */
  reportScore() {
    return this.api.postGameplay$(this.gamePlay).subscribe();
  }


}
