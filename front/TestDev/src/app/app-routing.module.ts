import { Component, NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from "@nebular/auth";
import { UsersComponent } from "./pages/users/users.component";
const routes: Routes = [
  //{path:'login',component:LoginComponent},
  { path: "**", component: UsersComponent },
  /**  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
    
  }
  , */
  { path: "users", component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.navigate(["/auth"]);
  }
}
