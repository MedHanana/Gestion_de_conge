import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {ActivatedRoute, Router} from "@angular/router";

import {User} from "../Model/user";
import { AuthService } from '../Service/auth.service';
import { UserApiService } from '../Service/user-api.service';
import {PAGE_LOGIN} from "../webRoutes";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

  id!:number;
  passwordEdit: boolean = false;
  passwordNoEdit: boolean = false;
  Password!: FormControl;
  insertForm!: FormGroup;
  user!: User;

  userInfo:User= {
    solde: 0,
    name: '',
    adress: '',
    email: '',
    password: ''
  }

  constructor(
              private authService: AuthService,
              private userService: UserApiService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.Password = new FormControl('', [Validators.required]);
    this.insertForm = this.fb.group({
      Password: this.Password
    })
  }

  onSubmit(){
      this.id = this.route.snapshot.params['id'];
      console.log('id',this.id);
      const password = this.insertForm.value.Password;
      console.log('password',password);

      this.authService.changePassword(this.id, password).subscribe({
        next: () => {
          console.log('id 2',this.id);

        this.passwordEdit = true;
        setTimeout(() => {
          console.log('id 3',this.id);

          this.passwordEdit = false;
          this.router.navigateByUrl(PAGE_LOGIN);
        }, 1000);
      },
      error: () => {
        console.log('id 24',this.id);

        this.passwordNoEdit = true;
        setTimeout(() => {
          this.passwordNoEdit = false;
        }, 2000);
      }
    });
  }

}
