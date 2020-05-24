import { Identifiants } from './identifiants';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class AuthService {

        authSubject = new Subject<boolean>();

        isAuth = false;
        error = false;


        constructor(private identifiants: Identifiants) { }

        signIn(formValue) {
            if(this.identifiants.identifiant==formValue.identifiant && this.identifiants.mdp==formValue.mdp){
                this.isAuth
                return this.isAuth = true;
            }else{
                return this.error = true;
            }
        }   
        
        signOut() {
            this.isAuth = false;
        }

        emitPostSubject (){
            this.authSubject.next(this.isAuth);
        }
        
    }