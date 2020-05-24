import { Component, OnInit  } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'fresh-eggs';
  opened = false;
  auth:boolean;

  backoff = false

  //authSubscription: Subscription;

  constructor(private authservice : AuthService) { }

  ngOnInit(): void {
    // this.backoff=this.authservice.isAuth;
    // this.authSubscription = this.authservice.authSubject.subscribe(
    //   (data:boolean)=>{
    //     this.auth = data
    //   }
    // );
    // this.authservice.emitPostSubject()
  } 
}


