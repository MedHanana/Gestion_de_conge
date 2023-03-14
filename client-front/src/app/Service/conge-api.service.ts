import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Conge} from "../Model/conge";
const baseUrl = 'http://localhost:8080/api/conges';

@Injectable({
  providedIn: 'root'
})
export class CongeApiService {

    constructor(private httpClient:HttpClient) { }

    getAllConge(){
        return this.httpClient.get(baseUrl);
    }
    getOneConge(id: number){
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
    getMyConge(){
        return this.httpClient.get(`${baseUrl}/myConges`);
    }
    validMyConge(id:number | string | undefined, conge : Conge){
        return this.httpClient.put(`${baseUrl}/valid/${id}`,conge);
    }
    getnotvalidconge(){
        return this.httpClient.get(`${baseUrl}/not_valid`);
    }
}
