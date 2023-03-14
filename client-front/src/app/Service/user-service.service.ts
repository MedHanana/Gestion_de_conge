import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../Model/user";
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

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

  getUserByID(id: number): Observable<User>{
    return this.httpClient.get<any>(`${baseUrl}/${id}`);
  }
 
}
