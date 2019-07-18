import { GameBehavior } from '../classes/game-behavior';
import { GamePlay } from '../classes/game-play';

export class Game1 extends GameBehavior {

  gameControls = [
    {
      label: 'Click as if your life depends on it',
      onClick: 'clickbait',
      classes: 'btn'
    }
  ];

  gradeScores = [10, 15, 20, 30, 50, 100];

  render(): string {
    return '';
  }

  getDisposableTime(): number {
    return 5000;
  }


  onInit(): void {
    super.onInit();

  }

  onStep(): void {}

// SPECIFIC LOGIC GOES HERE

  clickbait() {
    this.increaseScore(1);
    this.getGamePlay().grade = this.getGrade();
  }

}
