import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/shared/classes/game';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit {

  identifier: string;
  game: Game;

  message: string = '';
  score: number = 0;
  time: number = 0;
  maxTime: number = 0;
  gameIsRunning = false;
  gameInterval;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(p => this.identifier = p['id']);
    this.game = this.apiService.findGameById(this.identifier);
  }

  button1click() {
    this.increaseScore(1);
    this.showMessage("Score increased", 4000);
  }

  button2click() {
    this.showMessage("Button 2 clicked", 4000);
  }

  button3click() {
    this.gameOver();
  }

  gameInit() {
    this.message = '';
    this.score = 0;
    this.maxTime = 5000;
    this.time = 5000;
    this.gameIsRunning = true;
    this.gameInterval = setInterval(() => {
      this.timeElapse(50);
      if (this.time <= 0) {
        this.gameOver();
      }
    }, 50);
  }

  timeElapse(ms: number) {
    this.time -= ms;
  }

  increaseScore(amount: number) {
    this.score += amount;
  }

  showMessage(msg: string, ms?: number) {
    clearTimeout();
    this.message = msg;
    if (ms) {
      setTimeout(() => {
        this.message = '';
      }, ms);
    }
  }

  gameOver() {
    clearInterval(this.gameInterval);
    this.showMessage("Game over");
    // Enviar puntuación
    this.gameIsRunning = false;
  }

}
