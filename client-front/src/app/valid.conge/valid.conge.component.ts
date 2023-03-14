import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Conge } from '../Model/conge';
import { Type } from '../Model/Type';
import { AuthService } from '../Service/auth.service';
import { CongeApiService } from '../Service/conge-api.service';
import { CongeServiceService } from '../Service/conge-service.service';
import { TypeService } from '../Service/type.service';
import { UserServiceService } from '../Service/user-service.service';
@Component({
  selector: 'app-valid.conge',
  templateUrl: './valid.conge.component.html',
  styleUrls: ['./valid.conge.component.css']
})
export class ValidCongeComponent implements OnInit {
  conges:Conge[] = [];
  finalListConges:Conge[] = [];
  detailConge:Conge = {
    departureDate:new Date(),
    returnDate:new Date(),

  }
  today: string = new Date().toISOString().split('T')[0];
  isCongeAdded: boolean = false;
  isCongeNotAdded: boolean = false;
  totalLenght: number | undefined;
  page:number= 1;
  conge:Conge = {
    departureDate: new Date(),
    returnDate:  new Date(),
    validation: false,
  }
  departureDate: Date = new Date(0);
  returnDate: Date = new Date(0);
 
  isDepartureDateSelected:Boolean = false;
  isReturnDateSelected:Boolean = false;
  users: any;
  type: any;
  types:Type[]=[];
  disableSave : boolean = false;
  isCongeAlreadyExists: boolean = false;


  constructor(
    private congeService: CongeServiceService,
    private userService: UserServiceService,
    private modalService: NgbModal,
    private userApiService: UserServiceService,
    private authService : AuthService,
    private router: Router,
    private typeService: TypeService,
    private congeApiService: CongeApiService
    
  ){}

  ngOnInit(): void {
   
    this.  getListCongesnotvalid() ;
  
  }
  getListCongesnotvalid() {
    
    this.congeApiService.getnotvalidconge().subscribe(congeList=> {
      console.log(congeList);
      
      this.conges = Object.values(congeList);
      console.log(this.conges);
      this.totalLenght = this.conges.length;
    
      for(let i=0; i<this.totalLenght;i++){
          if(this.conges[i].user && this.conges[i].type)  {
            const idUser: number = <number><unknown> this.conges[i].user?.substring(11);
            const idType: number = <number><unknown> this.conges[i].type?.substring(11);

            console.log("test 22" ,idType);
            this.userService.getUserByID(idUser).subscribe((user)=>{
              this.conges[i].user= Object.values(user)[4];
              
          });
            this.typeService.getTypeByID(idType).subscribe((type)=>{
              this.conges[i].type= Object.values(type)[4];
              
            });
          
          }
       }

      });



  
  }
  deleteConge(id:any) {
    if (window.confirm('Are sure you want to delete this conge ?')) {
      this.congeService.deleteConge(id).subscribe(res => {
        this.getListCongesnotvalid();
        this.totalLenght = this.conges.length;
      })
    }
  }
  validateConge(id:any,conge:  Conge): void {
    this.congeApiService.validMyConge,(this.conge,id).subscribe(() => {
      // Conge validation successful, update list of unvalidated conges
      this.getListCongesnotvalid();
    }, () => {
      // Conge validation failed, update list of unvalidated conges
      this.getListCongesnotvalid();
    });
  }
}