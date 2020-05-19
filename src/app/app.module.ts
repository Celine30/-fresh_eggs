import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorPageComponent,
    ConseilComponent,
    EggsComponent,
    AuthComponent,
    BackoffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    Identifiants
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
