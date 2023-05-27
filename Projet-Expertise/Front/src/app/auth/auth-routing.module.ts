import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ActivateCompteComponent} from './user/activate-compte/activate-compte.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent,
  },
  {
    path: 'passwordreset/:id/:token',
    component: ResetPasswordComponent,
  },
  {
    path: 'inscription',
    component: RegisterComponent
  },
  {
    path: 'activate/:id/:token',
    component: ActivateCompteComponent
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
