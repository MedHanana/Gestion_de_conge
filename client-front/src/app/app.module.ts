
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CongeComponent } from './components/conge/conge.component';
import {HttpClientModule , HttpClientJsonpModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import {NgxPaginationModule} from "ngx-pagination";
import { CalenderComponent } from './calender/calender.component';
import {NgxTimeSchedulerModule} from 'ngx-time-scheduler';
import { TokenService } from './Service/token.service';
import { ProfileComponent } from './profile/profile.component';
import { ProfilEditComponent } from './profil-edit/profil-edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { TypecongeComponent } from './components/typeconge/typeconge.component';
import { ValidCongeComponent } from './valid.conge/valid.conge.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SidebarComponent,
        LoginComponent,
        AppComponent,
        UserComponent,
        CongeComponent,
        CalenderComponent,
        ProfileComponent,
        ProfilEditComponent,
        ChangePasswordComponent,
        ForgetPasswordComponent,
        TypecongeComponent,
        ValidCongeComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModalModule,
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientJsonpModule,
        NgxTimeSchedulerModule
        
    ]
})
export class AppModule { }
