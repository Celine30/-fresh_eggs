import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'

import { MaterialModule} from './material.module';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ConseilComponent } from './conseil/conseil.component';
import { EggsComponent } from './eggs/eggs.component';
import { AuthComponent } from './auth/auth.component';
import { BackoffComponent } from './backoff/backoff.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { Identifiants } from './services/identifiants';
import { OrderService } from './services/order.service';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorPageComponent,
    ConseilComponent,
    EggsComponent,
    AuthComponent,
    BackoffComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    Identifiants,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
