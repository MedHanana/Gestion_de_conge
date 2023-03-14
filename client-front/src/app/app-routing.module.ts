import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./components/user/user.component";
import {CongeComponent} from "./components/conge/conge.component";
import {LoginComponent} from "./login/login.component";
import { CalenderComponent } from './calender/calender.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ProfilEditComponent } from './profil-edit/profil-edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {ForgetPasswordComponent} from "./forget-password/forget-password.component";
import { TypecongeComponent } from './components/typeconge/typeconge.component';
import { ValidCongeComponent } from './valid.conge/valid.conge.component';

const routes: Routes = [
  { path: 'calendar', component: CalenderComponent, canActivate: [AuthGuard]},
  { path: 'conges', component: CongeComponent, canActivate: [AuthGuard]},
  { path: 'users', component: UserComponent},
  { path: "", redirectTo: "/login", pathMatch: "full"},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'profile-edit', component: ProfilEditComponent},
  { path: 'change-password/:id', component: ChangePasswordComponent},
  { path: 'forget-password', component: ForgetPasswordComponent},
  { path: 'type', component: TypecongeComponent},
  { path: 'validation', component: ValidCongeComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
