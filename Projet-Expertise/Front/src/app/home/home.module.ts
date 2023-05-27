import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { LayoutModule } from "@angular/cdk/layout";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "../materialModule/material.module";

import { AuthTokenInterceptor } from "../auth/guard/auth.interceptor";

import { NgImageSliderModule } from "ng-image-slider";

import { EditUserComponent } from "./user/edit-user/edit-user.component";

import { ListComponent } from "./admin-components/users/list/list.component";
import { EditComponent } from './admin-components/users/edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    MaterialModule,
    NgImageSliderModule,
  ],
  entryComponents: [],
  declarations: [WelcomePageComponent, EditUserComponent, ListComponent, EditComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
  ],
})
export class HomeModule {}
