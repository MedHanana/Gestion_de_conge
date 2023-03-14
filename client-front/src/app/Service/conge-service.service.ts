import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Conge} from "../Model/conge";
import { UserServiceService } from './user-service.service';
import { map } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/conges';

@Injectable({
  providedIn: 'root'
})
export class CongeServiceService {
  validMyConge(conge: Conge, id: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient:HttpClient, public userService:UserServiceService) { }

  getAllConge(){
    return this.httpClient.get(baseUrl);
    
  }
  getOneConge(id: number = 0){
    return this.httpClient.get(`${baseUrl}/${id}`);
  }
  addConge(conge: Conge){
    return this.httpClient.post(baseUrl, conge);
  }
  deleteConge(id: number | string | undefined) {
    return this.httpClient.delete(`${baseUrl}/${id}`);
  }
  editConge(conge: Conge, id: number){
    return this.httpClient.put(`${baseUrl}/${id}`, conge);
  }
}
