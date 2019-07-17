import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate() {
    if (this.authService.getToken()) {
      return true;
    } else {
      alert("It's necessary to be logged in in order to play!!");
      this.router.navigate(['/login']);
      return false;
    }
}

}
