import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth/guard/auth.guard';
import {DefaultLayoutComponent} from './containers/default-layout';
import {LoginComponent} from './auth/login/login.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Authentication'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
