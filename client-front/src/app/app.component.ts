import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./Service/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-front';

  constructor(public authService: AuthService){}

  isConnected(){
    return this.authService.loggedIn();
  }
}
