import { Injectable } from '@angular/core';
import { GameBehavior } from '../classes/game-behavior';
import { Game1 } from '../gameBehaviors/game1';
import { Game2 } from '../gameBehaviors/game2';
import { GamePlay } from '../classes/game-play';


@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  GAME_BEHAVIOR_PATH = '../gameBehaviors/';//'src/app/shared/gameBehaviors/';

  constructor() { }

  /**
   * Crea una instancia de conducta de juego a partir de un nombre de archivo.
   */
  createGameBehavior(scriptName: string): GameBehavior {
    // De momento se hará de forma 'semiestática'. En futuras versiones se realizará
    // la importación puramente dinámica
    let gb: GameBehavior;

    switch(scriptName.toLowerCase()) {
      case 'game1':
        gb = new Game1();
        break;
      case 'game2':
        gb = new Game2();
        break;
      default:
          gb = new Game1();
    }
    return gb;

  }

}
