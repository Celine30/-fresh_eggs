import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ConseilComponent } from './conseil/conseil.component';
import { EggsComponent } from './eggs/eggs.component';
import { AuthComponent } from './auth/auth.component';
import { ThanksComponent } from './thanks/thanks.component';
import { BackoffComponent } from './backoff/backoff.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path:'', component : HomeComponent },
  { path:'home', component : HomeComponent },
  { path:'home/:caller', component: HomeComponent },
  { path:'eggs', component : EggsComponent },
  { path:'conseil', component : ConseilComponent },
  { path:'thanks', component : ThanksComponent },
  { path:'auth', component : AuthComponent },
  { path:'backoff',canActivate:[AuthGuard], component : BackoffComponent },
  { path:'not-found', component : ErrorPageComponent },
  { path:'**', redirectTo : '/not-found' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
