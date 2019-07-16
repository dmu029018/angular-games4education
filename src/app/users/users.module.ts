import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommonsModule } from '../commons/commons.module';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    CommonsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [LoginComponent, RegisterComponent]
})
export class UsersModule { }
