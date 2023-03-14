import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../Model/user";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {UserServiceService} from "../../Service/user-service.service";
import {isNumber} from "ngx-bootstrap/carousel/utils";
import { UserApiService } from 'src/app/Service/user-api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  totalLenght!: number;
  page:number= 1;
  users : User[] = [];
  user : User= {
    name: '',
    adress: '',
    email: '',
    password: '',
    solde: 0,
    create_at: new Date(),
    updated_at: new Date()
  }
  name: any;
  constructor(private userApiService: UserApiService,
              private modalService: NgbModal,
             
              ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
    this.userApiService.getAllUser().subscribe(listUser=>{
      console.log(listUser);
      
        this.users = Object.values(listUser)[3];
        this.totalLenght = this.users.length;
    });
  }
  clearFormUser() {
    this.user= {
      name: '',
      adress: '',
      email: '',
      password: '',
    }
  }
  saveUser(form: NgForm) {
    if (form.valid) {
      this.userApiService.addUser(this.user).subscribe({
        next: () => {
          this.getUserList();
          this.clearFormUser();
        },
        error: () => {
          this.clearFormUser();
        }
      });
    }
  }

  updateUser(form:NgForm ,id: any){
    this.userApiService.updateUser(form.value, id).subscribe({
      next:()=>{
        this.getUserList();
      },
      error:()=>{
        this.getUserList();
      }
    });
  }

  deleteUser(id: any) {
    Swal.mixin({
      customClass: {
        confirmButton: 'btn sweet',
        cancelButton: 'btn btn-danger'
      },
    }).fire({
      title: "user has been successfully deleted",
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.userApiService.deleteUser(id).subscribe({
          next: () => {
            Swal.fire(
                '',
                'success'
            );
            this.getUserList();
          },
          error: () => {
            Swal.fire(
                '',
                'info'
            );
          }
        })
      }
    });
  }
  search(){
    if(this.name==""){
      this.ngOnInit();
    }else {
      this.users = this.users.filter(res=>{
        if(res.email.toLocaleLowerCase().match(this.name.toLocaleLowerCase())){
          return res.email.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        } else {
          return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
        }
      })
    }
  }

  popUp(longContent: any) {
    this.modalService.open(longContent, { scrollable: false });
  }
  close(modal:any){
    modal.close('Close click');
    this.clearFormUser();
  }
}
