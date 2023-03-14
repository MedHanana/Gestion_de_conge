import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PAGE_LOGIN} from "../webRoutes";
import {Router} from "@angular/router";
import {AuthService} from "../Service/auth.service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  emailSent: boolean = false;
  emailNoSent: boolean = false;
  Email!: FormControl;
  insertForm!: FormGroup;

  constructor(
      private authService: AuthService,
      private fb: FormBuilder,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.Email = new FormControl('', [Validators.required, Validators.email]);
    this.insertForm = this.fb.group({
      Email: this.Email
    })
  }

  onSubmit(){
    let userInfo = this.insertForm.value;
    this.authService.forgetPassword(userInfo.Email).subscribe({
      next: () =>{
        this.emailSent = true; setTimeout(() => {
          this.emailSent = false;
          this.router.navigateByUrl(PAGE_LOGIN);
        }, 2000);
      },
      error: ()=>{
        this.emailNoSent = true;
        setTimeout(() => {
          this.emailNoSent = false;
        }, 2000);
      }
    })
  }
}
