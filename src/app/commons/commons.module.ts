import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AppRoutingModule } from '../app-routing.module';
import { BrandComponent } from './brand/brand.component';


@NgModule({
  declarations: [HeaderComponent, NavbarComponent, FooterComponent, HomeComponent, NotfoundComponent, SpinnerComponent, BrandComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [HeaderComponent, NavbarComponent, FooterComponent, HomeComponent, NotfoundComponent, SpinnerComponent, BrandComponent]
})
export class CommonsModule { }
