import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {map, tap} from "rxjs";

const baseUrl = "http://localhost:8080";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
   return  this.http.post(baseUrl+'/api/login_check', { username, password })
        .pipe(
            map((response:any) => {
              if (response) {
                localStorage.setItem('jwt', JSON.stringify(response.token));
              }
            })
        );
  }

  forgetPassword(email: string){
    return  this.http.post(baseUrl+`/api/forget/password`, {'email': email});
  }

  changePassword(id:number, password: string){
      return  this.http.patch(baseUrl+`/api/change/password/${id}`, {password});
  }

  loggedIn() {
      let token = localStorage.getItem('jwt');
      if (token) {
          return true;
      } else {
          return false;
      }
  }

  logoutUser(){
      localStorage.removeItem('jwt');
      localStorage.removeItem('refresh_token');
  }

  setToken(accessToken: string) {
      localStorage.setItem('jwt', JSON.stringify(accessToken));
  }

  getToken(){
        // @ts-ignore
      return JSON.parse(localStorage.getItem('jwt'));
  }

  getRoleUser(token:any){
      return JSON.parse(atob(token.split(".")[1])).roles;
  }
  getEmailUser(token:any){
        return JSON.parse(atob(token.split(".")[1])).email;
  }

  isAdmin(){
        let role = this.getRoleUser(localStorage.getItem('jwt'));
        
            return true
        
  }
  
}