import { Grade } from '../enums/grade.enum';
import { HashService } from '../services/hash.service';
import * as moment from 'moment';

export class GamePlay {
  id: string;
  userId: string;
  gameId: string;
  score: number;
  grade: Grade;
  dateTime: string;

  constructor(gameId, userId, score, grade) {
    this.gameId = gameId;
    this.userId = userId;
    this.score = score;
    this.grade = grade;
    this.dateTime = moment().format();
    this.generateId();
  }

  generateId() {
    this.id = HashService.generateHash(this.dateTime + '').toString(16)
            + HashService.generateHash(this.userId + '').toString(16)
            + HashService.generateHash(this.gameId + '').toString(16);
  }

}
