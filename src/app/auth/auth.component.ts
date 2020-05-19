import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})


export class AuthComponent implements OnInit {
  
  AuthForm : FormGroup;
  authstatus : boolean;
  error = false;

  constructor( private router: Router , private authService: AuthService, private formBuilder : FormBuilder) { }

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
    this.error = this.authService.error;
    this.router.navigate(['backoff']);
      }
    
  

  onsignOut(){
    console.log('se déconnecter');
    this.authService.signOut();
    this.authstatus = this.authService.isAuth;
  }

}

