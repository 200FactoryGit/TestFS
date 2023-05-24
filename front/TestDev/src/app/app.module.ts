import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PagesModule } from "./pages/pages.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NbThemeModule, NbLayoutModule } from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { HttpClientModule } from "@angular/common/http";
import {
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy,
} from "@nebular/auth";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: "email",
          token: {
            class: NbAuthJWTToken,
            key: "token",
          },
          baseEndpoint: "http://localhost:8080",
          login: {
            endpoint: "/api/login_check",
            method: "post",
            redirect: {
              success: "/users",
              failure: null, // stay on the same page
            },
          },
        }),
      ],
      forms: {},
    }),
    HttpClientModule,
    AppRoutingModule,
    PagesModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: "corporate" }),
    NbLayoutModule,
    NbEvaIconsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
