import { GameBehavior } from '../classes/game-behavior';
import { GamePlay } from '../classes/game-play';

export class Game2 extends GameBehavior {

  gameControls = [
    {
      label: 'Red',
      onClick: 'clickRed',
      classes: 'btn btn-danger'
    },
    {
      label: 'Green',
      onClick: 'clickGreen',
      classes: 'btn btn-success'
    },
    {
      label: 'Blue',
      onClick: 'clickBlue',
      classes: 'btn btn-info'
    },

  ];

  gradeScores = [10, 20, 40, 90, 180, 400];

/** GAME SPECIFIC VARIABLES GOES HERE*/

  colors = ['red', 'green', 'blue'];
  currentColor = null;

//////////////////////////////////////

  render(): string {
    this.renderText = this.currentColor;
    return this.currentColor;
  }

  getDisposableTime(): number {
    return 5000 - this.getGamePlay().grade * 750;
  }

  onInit(): void {
    super.onInit();
    this.generateColor();
    this.render();
  }

  onStep(): void {
    const scoreGain = Math.floor(this.getGrade() + this.currentTime / 1000 + (0.25 * this.getGrade()) );
    this.increaseScore(scoreGain);
    this.getGamePlay().grade = this.getGrade();

    this.generateColor();
    this.restoreTime();
    this.render();
  }

// SPECIFIC LOGIC GOES HERE

  /**
   * Genera un nuevo color entre los disponibles, escogido al azar.
   */
  generateColor() {
    this.currentColor = this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  playColor(color: string) {
    if (color === this.currentColor) {
      this.onStep();
    } else {
      this.isOver = true;
    }
  }

  /**
   * Se activa al clickar rojo
   */
  clickRed() {
    this.playColor('red');
  }

  /**
   * Se activa al clickar verde
   */
  clickGreen() {
    this.playColor('green');
  }

  /**
   * Se activa al clickar azul
   */
  clickBlue() {
    this.playColor('blue');
  }

}
