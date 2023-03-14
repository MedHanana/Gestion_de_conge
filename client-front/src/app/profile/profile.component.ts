import { Component, OnInit } from '@angular/core';
import {UserApiService} from "../Service/user-api.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {User} from "../Model/user";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profilEdit: boolean = false;
  profilNoEdit: boolean = false;
  user:any;
  constructor(private userApiService: UserApiService,
              private modalService: NgbModal)
  { }

  ngOnInit(): void {
    this.getProfile();
  }
  getProfile(){
    this.userApiService.getProfile().subscribe({
      next:(listUser) =>{
        this.user = listUser;
        console.log("test",this.user);
      }
    });
  }
  
  popUp(longContent: any) {
    this.modalService.open(longContent, { scrollable: false });
  }
}