import { Component, OnInit } from '@angular/core';
import {AuthService} from "../Service/auth.service";
import {Router} from "@angular/router";
import {PAGE_CONGE} from "../webRoutes";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = {
    username : "",
    password : ""
  }
  showErrorMessage : boolean =false ;
  constructor(private authService : AuthService, private router: Router) { }
  key = this.authService.getToken();
  ngOnInit(): void {
    console.log("key222 : ",this.key)
  }
  save(form: NgForm) {
    this.showErrorMessage = false;
    if (form.valid) {
      this.authService.login(this.login.username,this.login.password).subscribe(() => {
            this.router.navigateByUrl(PAGE_CONGE);
            console.log("keykey",this.key);
            
          },
          (error: any) => {
            console.log(error);
            this.showErrorMessage = true;
          });
    }
  }

}
