import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { User } from 'src/app/shared/classes/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Comprueba si el usuario está logueado
  userIsLogged;
  user = null;
  totalScore = 0;

  constructor(private auth: AuthService, private api: ApiService, private router: Router) {
    this.userIsLogged = auth.isLogged();
    if (this.userIsLogged) {
      // Simula la obtención de un usuario

      /*
      this.user = auth.getLoggedUser();
      this.user = new User("PruebaNickname", "PruebaEmail", "PruebaPassword", '12345');
      this.user.setId('12345');

      this.totalScore = this.getUserTotalScore();
      */

      this.user = auth.getLoggedUser();
    }
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logoutUser();
    this.userIsLogged = false;
    this.router.navigate(['/home']);
  }

  getUserTotalScore() {
    const gamePlays = this.api.getGameplays4user$(this.user.getId());
    return gamePlays.reduce((score, gp) => score + gp.score, 0);
  }

}
