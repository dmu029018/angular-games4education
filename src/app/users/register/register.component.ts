import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, SelectControlValueAccessor } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public isError: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

    this.registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        nickname: ['', [Validators.required, Validators.minLength(3)]]
      });

  }

  ngOnInit() {

  }

  /**
   * Getter para email
   */
  get email() {
    return this.registerForm.get('email');
  }

  /**
   * Getter para password
   */
  get password() {
    return this.registerForm.get('password');
  }

  /**
   * Getter para confirmación de password
   */
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  /**
   * Getter para nombre de usuario
   */
  get nickname() {
    return this.registerForm.get('nickname');
  }

  /**
   * Se ejeuta al enviar el formulario
   */
  onSubmit() {
    console.log(this.registerForm.value);
    if (this.registerForm.invalid || this.password !== this.confirmPassword) {
      // Error de datos.
      this.onIsError();
      return;
    }
    // Datos form correctos
    const userObs = this.authService.registerUser(this.nickname.value, this.email.value, this.password.value);
    return userObs.subscribe(
        data => {
          // Éxito al enviar
          alert("success");
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
   * Se ejecuta en caso de error en el formulario
   */
  onIsError() {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

}
