import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isError: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  /**
   * Getter para email
   */
  get email() {
    return this.loginForm.get('email');
  }

  /**
   * Getter para password
   */
  get password() {
    return this.loginForm.get('password');
  }

  /**
   * Se dispara asl enviar el formulario
   */
  onSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      this.onIsError();
      return;
    }

    const userObs = this.authService.loginUser(this.email.value, this.password.value);
    return userObs.subscribe(
        data => {
          // Éxito al enviar
          const token = data.accessToken;
          this.authService.setToken(token);
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/home']);
          this.isError = false;
        },
        error => this.onIsError()
      );
  }

  /**
   * Se dispara si hay errores en el formulario.
   */
  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
}

}
