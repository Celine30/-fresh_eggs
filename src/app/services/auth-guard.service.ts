import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()

export class AuthGuard implements CanActivate{

    constructor(private authservice : AuthService, private router:Router){}

    canActivate(
        route:ActivatedRouteSnapshot,
        state:RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean{

        if(this.authservice.isAuth){
            return true;    
        }else{
            this.router.navigate(['/auth'])
        }
    }
}