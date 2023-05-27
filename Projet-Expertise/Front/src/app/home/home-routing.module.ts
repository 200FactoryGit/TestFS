import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomePageComponent } from "./welcome-page/welcome-page.component";
import { ListComponent } from "./admin-components/users/list/list.component";
import { EditUserComponent } from "./user/edit-user/edit-user.component";
import { EditComponent } from "./admin-components/users/edit/edit.component";

const routes: Routes = [
  {
    path: "welcome",
    component: WelcomePageComponent,
  },
  {
    path: "users-list",
    component: ListComponent,
  },
  {
    path: "edit-user",
    component: EditUserComponent,
  },
  {
    path: "edit/:id",
    component: EditComponent,
  },

  {
    path: "**",
    redirectTo: "welcome",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
