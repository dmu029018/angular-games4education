import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Comprueba si el usuario está logueado
  userIsLogged;
  user = null;

  constructor(private auth: AuthService) {
    this.userIsLogged = auth.isLogged();
  }

  ngOnInit() {
  }

}
