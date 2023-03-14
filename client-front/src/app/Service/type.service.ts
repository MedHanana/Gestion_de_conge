import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const baseUrl ='http://localhost:8080/api/types'
@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private httpClient:HttpClient) { }

  getAllType(){
    return this.httpClient.get(baseUrl);
  }
  getTypeByID(id: number){
    return this.httpClient.get(`${baseUrl}/${id}`);
} 
}
