import { GamePlay } from './game-play';

export abstract class GameBehavior {

  // Si es true termina la partida. Se usa para cuando la partida termina por otra causa diferente al tiempo.
  isOver = false;
  renderText = '';

  gameControls: { // NOTA: de momento serán solamente botones
    label: string,
    onClick: string, // debe corresponder al nombre de una función del objeto
    classes: string
  }[];

  gradeScores: number[]; // 6 elementos

  currentTime = 1;
  maxTime = 1;

  /**
   * Constructor
   * @param gamePlay Instancia de partida. Opcional.
   */
  constructor(private gamePlay?: GamePlay) {}


  /**
   * Muestra contenido en el panel de juego.
   *
   * Por el momento se utiliza con un espacio para texto, pero en
   * un futuro se planea implementar con un canvas.
   */
  abstract render(): string;

  /**
   * Calcula el tiempo disponible hasta el siguiente paso.
   */
  abstract getDisposableTime(): number;

  /**
   * Script a ejecutar cuando se avanza un paso.
   * Usualmente se restauran cosas y se reinicia el tiempo,
   * pero no en todos los juegos funciona así.
   */
  abstract onStep(): void;

  /**
   * Script ejecutado al iniciar el juego.
   */
  onInit() {
    this.restoreTime();
    this.gamePlay.score = 0;
    this.gamePlay.grade = 0;
    this.isOver = false;
  }

  /**
   * Incrementa la puntuación de la partida.
   */
  increaseScore(score: number) {
    this.gamePlay.score += score;
  }

  /**
   * Obtiene la calificación actual en el juego.
   * Se basa en la puntuación y los requisitos difieren de un juego a otro.
   */
  getGrade() {
    const numOfGrades = this.gradeScores.length;
    for (let i = 0; i < numOfGrades; i++) {
      if (this.gradeScores[i] > this.gamePlay.score) {
        return i;
      }
    }
    return numOfGrades;
  }

  /**
   * Obtiene la instancia de partida actual.
   */
  getGamePlay() {
    return this.gamePlay;
  }

  /**
   * Asigna una instancia de partida.
   */
  setGamePlay(gamePlay: GamePlay) {
    this.gamePlay = gamePlay;
  }

  restoreTime() {
    this.maxTime = this.getDisposableTime();
    this.currentTime = this.maxTime;
  }

  /**
   * Llama a una función de este objeto.
   *
   * Se recomienda que solamente llame a funciones no implementadas en esta
   * interfaz, ya que forman parte de las fases troncales del juego.
   * Y sobre todo, que no llamen a ésta.
   *
   * @param methodName Nombre de la función a llamar.
   */
  callMethod(methodName) {
    console.log("calling to: " + methodName)
    this[methodName]();
  }
}
