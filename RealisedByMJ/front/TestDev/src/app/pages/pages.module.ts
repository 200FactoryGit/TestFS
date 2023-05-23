import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    LoginComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  exports:[
    UsersComponent
  ]
})
export class PagesModule { }
