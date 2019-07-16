import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/shared/classes/game';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

  identifier: string;
  game: Game;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(p => this.identifier = p['id']);
    this.apiService.getGame$(this.identifier).subscribe(g => this.game = g);
  }

}
