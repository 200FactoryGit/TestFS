import { Component, OnInit, Inject } from "@angular/core";
import { EditUserModel } from "../../Models/editUser.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiErrorsService } from "src/app/shared/api-errors.service";
import { NotificationService } from "src/app/shared/notification.service";
import { MustMatchPwdService } from "src/app/shared/mustMatchPwd.service";

import { finalize, catchError } from "rxjs/operators";
import { EditUserPWDModel } from "../../Models/editUserPwd.model";
import { ResetPasswordService } from "../../Services/resetPwd.service";
import { Router } from "@angular/router";
import { UserService } from "../../Services/user.service";
import { HttpClient } from "@angular/common/http";
import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.css"],
})
export class EditUserComponent implements OnInit {
  model: EditUserModel = {} as EditUserModel;
  userPwdModel: EditUserPWDModel = {} as EditUserPWDModel;
  editProfileForm: FormGroup;
  editPwdForm: FormGroup;
  submitted = false;
  submittedPwd = false;
  errorMsg = false;
  emailPattern = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]{3,}\\.[A-Za-z]{2,3}";
  isLoading = false;
  currentUser: EditUserModel;
  currentTab = 0;
  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private apiErrors: ApiErrorsService,
    private notifications: NotificationService,
    private userService: UserService,
    private mustMatchPwdService: MustMatchPwdService,
    private resetPasswordService: ResetPasswordService,
    private router: Router
  ) {
    this.apiErrors.onError.subscribe((_) => {
      console.log("entring to error creating edit user");
      this.setErrors();
    });
    this.model = new EditUserModel();
  }
  ngOnInit() {
    this.currentUser = JSON.parse(
      localStorage.getItem("Project:e-expertise:currentUser")
    );

    this.initForms();
    this.isLoading = true;
    this.userService
      .getUser(this.currentUser.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((result) => {
        console.log("list " + result);
        this.model = {
          id: result.id,
          first_name: result.fname,
          last_name: result.lname,
          email: result.email,
          username: result.login,
        } as EditUserModel;
        this.editProfileForm.setValue({
          first_name: result.fname,
          last_name: result.lname,
          email: result.email,
          username: result.login,
        });
      });

    this.loadScript("assets/bundles/libscripts.bundle.js");
    this.loadScript("assets/bundles/vendorscripts.bundle.js");
    //  this.loadScript('assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js');
    this.loadScript("assets/bundles/mainscripts.bundle.js");
    this.loadScript("assets/bundles/knob.bundle.js");
  }
  public loadScript(url: string) {
    const body = document.body as HTMLDivElement;
    const script = document.createElement("script");
    script.innerHTML = "";
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  initForms() {
    this.editProfileForm = this.fb.group({
      username: ["", [Validators.required]],
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      email: [
        "",
        [Validators.required, , Validators.pattern(this.emailPattern)],
      ],
    });
    this.editPwdForm = this.fb.group(
      {
        ancienPassword: ["", [Validators.required]],
        nouvPassword: ["", [Validators.required, Validators.minLength(8)]],
        confirmPassword: ["", [Validators.required]],
      },
      {
        validator: this.mustMatchPwdService.mustMatch(
          "nouvPassword",
          "confirmPassword"
        ),
      }
    );
  }
  setErrors() {
    const error = this.apiErrors.getErrors(location.pathname);
    let msg = "";
    if (error && error.status === 404) {
      console.log("error.errors" + error.errors);
      for (const item of error.errors) {
        msg += item.messages;
      }
      this.notifications.notify(msg);
    }
    let messages;
    if (error && error.status === 400) {
      for (const item of error.errors) {
        messages = JSON.parse(JSON.stringify(item.messages));
        if (messages) {
          for (let i = 0; i < messages.length; i++) {
            const singleCell = messages[i];

            msg = singleCell;
          }
        }
      }
      if (messages) {
        this.notifications.notify(msg);
      }
    }
    Object.keys(this.editProfileForm.controls).forEach((key) => {
      const control = this.editProfileForm.get(key);
      // Suppression des erreurs de validation
      control.setErrors(null);
      // Obtention des Ă©ventuelles erreurs de validation
      const errors = this.apiErrors.getFieldErrors(location.pathname, key);
      if (errors && errors.length > 0) {
        // Application des erreurs sur le controle
        errors.forEach((value, idx) => {
          control.setErrors({ [`${key}-${idx}`]: value }, { emitEvent: true });
        });
      }

      control.markAsTouched();
    });
  }
  getErrors(key: string): string[] {
    return this.apiErrors.getFieldErrors(location.pathname, key);
  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): number => {
    // console.log('tabChangeEvent => ', tabChangeEvent);
    console.log("index => ", tabChangeEvent.index);
    return (this.currentTab = tabChangeEvent.index);
  };
  // convenience getter for easy access to form fields
  get showErrorMsg() {
    if (this.currentTab == 0) {
      return this.editProfileForm.controls;
    } else {
      return this.editPwdForm.controls;
    }
  }
  hideErrorMsg() {
    this.errorMsg = false;
  }
  updateUserProfile() {
    this.submitted = true;
    this.model = this.editProfileForm.value as EditUserModel;
    // stop here if form is invalid
    if (this.editProfileForm.invalid) {
      this.errorMsg = true;
      return;
    }
    this.model.id = this.currentUser.id;
    console.log(this.model);
    this.userService.updateUser(this.model).subscribe((data) => {
      if (data) {
        console.log("Patch Request is successful ", data);
        this.notifications.notify("votre compte a été modifié avec succés");
        localStorage.setItem("currentUser", JSON.stringify(data));
        this.router.navigate(["/"]);
        return;
      }
    });
  }

  get showErrorMsgPwd() {
    return this.editPwdForm.controls;
  }

  changeUSerPwd() {
    this.submittedPwd = true;
    this.userPwdModel.ancienPassword =
      this.editPwdForm.controls.ancienPassword.value;
    this.userPwdModel.nouvPassword =
      this.editPwdForm.controls.nouvPassword.value;

    // stop here if form is invalid
    if (this.editPwdForm.invalid) {
      this.errorMsg = true;
      return;
    }
    this.resetPasswordService
      .updateUserPWd(this.userPwdModel)
      .pipe(catchError((error) => this.apiErrors.handleApiError(error)))
      .subscribe((data) => {
        console.log(" out put api test " + JSON.stringify(data));

        this.notifications.notify(
          "votre mot de pass a été modifié avec succés"
        );
        this.router.navigate(["/login"]);
      });
  }
  onResetProfile() {
    this.submitted = false;
    this.editProfileForm.reset();
  }
  onResetPWDForm() {
    this.submittedPwd = false;
    this.editPwdForm.reset();
  }
}
