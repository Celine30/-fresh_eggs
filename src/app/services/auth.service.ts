import { Identifiants } from './identifiants';
import { Injectable } from '@angular/core';


@Injectable()

export class AuthService {

        isAuth = false;
        error = false;

        constructor(private identifiants: Identifiants) { }

        signIn(formValue) {
            if(this.identifiants.identifiant==formValue.identifiant && this.identifiants.mdp==formValue.mdp){
                return this.isAuth = true;
            }else{
                return this.error = true;
            }
        }   
        
        signOut() {
            this.isAuth = false;
        }

    }