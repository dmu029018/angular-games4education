import { GamePlay } from '../classes/game-play';
import { Grade } from '../enums/grade.enum';

export const GAMEPLAYS: GamePlay[] = [
  // TODO crear datos de prueba
  {
    "id": "12345",
    "userId": "12345",
    "gameId": "12345",
    "score": 100,
    "grade": Grade.A,
    "dateTime": "20121515"
  } as GamePlay,
  {
    "id": "12346",
    "userId": "12345",
    "gameId": "12377",
    "score": 22,
    "grade": Grade.E,
    "dateTime": "20121516"
  } as GamePlay,
  {
    "id": "12347",
    "userId": "14345",
    "gameId": "15377",
    "score": 375,
    "grade": Grade.S,
    "dateTime": "65132165"
  } as GamePlay
];
