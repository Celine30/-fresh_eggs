import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})


export class AuthComponent implements OnInit {
  
  AuthForm : FormGroup;
  authstatus = false;
  error = false;
  hide = true;

  constructor( private router: Router , private authService: AuthService, private formBuilder : FormBuilder, private appcomponent : AppComponent) { }

  initForm(){
    this.AuthForm = this.formBuilder.group({
      identifiant: '',
      mdp:'',
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.authstatus = this.authService.isAuth
  }

  onsignIn(){
    const formValue = this.AuthForm.value;
    this.authService.signIn(formValue)
    this.authstatus = this.authService.isAuth;
    this.appcomponent.backoff = this.authstatus
    this.error = this.authService.error;
    this.router.navigate(['backoff']);
      }
    

}

