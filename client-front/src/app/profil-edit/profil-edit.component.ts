import { Component } from '@angular/core';

import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import { UserApiService } from '../Service/user-api.service';
import { AuthService } from '../Service/auth.service';
import {PAGE_LOGIN} from "../webRoutes";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profil-edit',
  templateUrl: './profil-edit.component.html',
  styleUrls: ['./profil-edit.component.css']
})
export class ProfilEditComponent {
  profilEdit: boolean = false;
  profilNoEdit: boolean = false;
  user:any;
name: any;
id!:number;
passwordEdit: boolean = false;
passwordNoEdit: boolean = false;
Password!: FormControl;
insertForm!: FormGroup;
  constructor(private userApiService: UserApiService,
              private modalService: NgbModal,
               private AuthService : AuthService,
               private fb: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
              
              )
  { 
  }


  ngOnInit(): void {
    this.getProfile();
    
  }
  getProfile(){
    this.userApiService.getProfile().subscribe({
      next:(listUser) =>{
        this.user = listUser;
        console.log(this.user) ;
      }
      

    });
  }
  updateProfile(form:NgForm ,id: any){
    this.userApiService.updateUser(form.value, id).subscribe({
      next:()=>{
        this.profilEdit = true;
        setTimeout(() => {
          this.profilEdit  = false;
        }, 1200);
          this.getProfile();
      },
      error:()=>{
        this.profilNoEdit = true;
        setTimeout(() => {
          this.profilNoEdit  = false;
        }, 1200);
        this.getProfile();
      }
    });
  }
 

}
