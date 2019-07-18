export class Game {

  /**
   * Identificador de juego.
   */
  id: string;

  /**
   * Título del juego.
   */
  name: string;

  /**
   * Fichero de script del juego.
   * De momento se guardan en /app/shared/gameBehaviours/
   */
  script: string;

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Genera una ID para el juego.
   *
   * En un futuro se reemplazará la implementación para utilizar el generador de hash.
   */
  private generateId() {
    const timestamp = (new Date().getTime() / 1000).toString(16);
    this.id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
      (Math.random() * 16).toString(16)
    ).toLowerCase();
  }

}
