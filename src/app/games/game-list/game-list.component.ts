import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/shared/classes/game';
import { ApiService } from 'src/app/shared/services/api.service';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  games: Game[];

  constructor(private api: ApiService) {
    this.api.getGames$().subscribe((g: Game[]) => this.games = g);
  }

  ngOnInit() {

  }


}
