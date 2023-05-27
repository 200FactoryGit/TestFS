import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import {AuthModule} from './auth/auth.module';
import {DefaultLayoutComponent} from './containers/default-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthTokenInterceptor} from './auth/guard/auth.interceptor';
import {HomeModule} from './home/home.module';
import {MaterialModule} from './materialModule/material.module';
import {ToastrModule} from 'ngx-toastr';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import {MAT_DATE_LOCALE} from "@angular/material/core";


const APP_CONTAINERS = [
  DefaultLayoutComponent,
];
@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,

  ],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ToastrModule.forRoot(),
    AuthModule,
    HomeModule
  ],
  providers: [
    {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthTokenInterceptor,
    multi   : true,
  },{provide : LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
