import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Type } from "../../../Models/Type";
import { Branche } from "../../../Models/Branche";
import { Representant } from "../../../Models/Representant";
import { Client } from "../../../Models/Client";
import { Prestation } from "../../../Models/Prestation";
import { PrestationService } from "../../../Services/prestation.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TypeService } from "../../../Services/type.service";
import { ClientService } from "../../../Services/client.service";
import { RepresentantService } from "../../../Services/representant.service";
import { ImageService } from "../../../Services/image.service";
import { BrancheService } from "../../../Services/branche.service";
import { UserService } from "src/app/home/Services/user.service";
import { User } from "src/app/home/Models/User";
import { EditUserModel } from "src/app/home/Models/editUser.model";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"],
})
export class EditComponent implements OnInit {
  addForm: FormGroup;

  public representants: Representant[];
  public user: EditUserModel;
  representant: Representant;

  model: Prestation = <Prestation>{};

  constructor(
    private formBuilder: FormBuilder,
    private orestationsService: PrestationService,
    private router: Router,
    private routes: ActivatedRoute,
    private typeservice: TypeService,
    private clientservice: ClientService,
    private repS: RepresentantService,
    private imageService: ImageService,
    private brancheservice: BrancheService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      login: ["", Validators.required],
      lname: ["", Validators.required],
      fname: ["", [Validators.required]],
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
    const routeParams = this.routes.snapshot.params;

    this.userService.getUser(routeParams.id).subscribe((user) => {
      this.user = user;

      this.addForm.patchValue(this.user);
    });
  }

  patchValueType(value) {
    this.addForm.patchValue({
      type: value,
    });
    this.addForm.get("type").updateValueAndValidity();
    console.log(this.addForm.value);
  }

  patchValueBranche(value) {
    this.addForm.patchValue({
      branche: value,
    });
    this.addForm.get("branche").updateValueAndValidity();
    console.log(this.addForm.value);
  }

  patchValueRepresentants(value) {
    this.addForm.patchValue({
      representant: value,
    });
    this.addForm.get("representant").updateValueAndValidity();
    console.log(this.addForm.value);
  }

  patchValueClients(value) {
    this.addForm.patchValue({
      client: value,
    });
    this.addForm.get("client").updateValueAndValidity();
    console.log(this.addForm.value);
  }

  update() {
    console.log(this.addForm.value);
    this.model = this.addForm.value;
    this.model.id = this.user.id;
    this.userService.update(this.model).subscribe(
      () => {
        this.router.navigate(["home/users-list"]);
      },
      (error) => {
        alert(JSON.stringify(error));
      }
    );
  }

  deleteImage(sid) {
    this.imageService.delete({ id: sid }).subscribe(() => {
      document.getElementById("image" + sid).style.display = "none";
    });
  }
}
