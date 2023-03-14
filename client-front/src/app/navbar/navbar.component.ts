import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/user';
import { AuthService } from '../Service/auth.service';
import {UserApiService} from "../Service/user-api.service";
import { PAGE_LOGIN } from '../webRoutes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  
  

  constructor(private authService: AuthService, private router: Router,private userApiService: UserApiService) { 

   
  }


  ngOnInit(): void {
    this.getProfile();
  }
  
  logout(){
    this.authService.logoutUser();
    this.router.navigateByUrl(PAGE_LOGIN);
  }
  
 
  getProfile(){
    this.userApiService.getProfile().subscribe({
      next:(listUser) =>{
        this.user = listUser;
        console.log("test",this.user);
      }
    });
  
}}
