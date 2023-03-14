import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Model/user';
const baseUrl = 'http://localhost:8080/api/users';
@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private httpClient:HttpClient) { }

  getAllUser() {
    return this.httpClient.get(baseUrl);
  }

  addUser(user: User){
      return this.httpClient.post(baseUrl, user);
  }

  deleteUser(id: number) {
      return this.httpClient.delete(`${baseUrl}/${id}`);
  }

  updateUser(user: User, id: number){
      return this.httpClient.put(`${baseUrl}/${id}`, user);
  }
  getProfile(){
    return this.httpClient.get(`${baseUrl}/myProfile`);
  }

  getUserByID(id: number){
      return this.httpClient.get(`${baseUrl}/${id}`);
  } 
}
