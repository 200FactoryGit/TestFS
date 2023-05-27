import { AuthGuard } from "./guard/auth.guard";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ActivateCompteComponent } from "./user/activate-compte/activate-compte.component";
import { EditUserComponent } from "../home/user/edit-user/edit-user.component";
import { MaterialModule } from "../materialModule/material.module";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ActivateCompteComponent,
  ],
  providers: [],
})
export class AuthModule {}
