import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MustMatchPwdService } from 'src/app/shared/mustMatchPwd.service';
import { catchError } from 'rxjs/operators';
import { ApiErrorsService } from 'src/app/shared/api-errors.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { ResetPasswordModel } from '../models/ResetPasswordModel';
import { ResetPasswordService } from '../services/resetPwd.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  model: ResetPasswordModel = <ResetPasswordModel>{};
  resetPasswordForm: FormGroup;
  confirmResetPasswordForm: FormGroup;
  submitted: boolean = false;
  isValidated: boolean = false;
  errorMsg: boolean = false;
  isLoading: boolean = false;
  emailPattern = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]{3,}\\.[A-Za-z]{2,3}';
  interfaceSaisiEmail: boolean = true;
  interfaceSaisiNouvPWD: boolean = false;
  constructor(private fb: FormBuilder, private http: HttpClient,
              private resetPasswordService: ResetPasswordService,
              private route: ActivatedRoute,
              private mustMatchPwdService: MustMatchPwdService,
              private apiErrors: ApiErrorsService,
              private notifications: NotificationService,
              private router: Router) {
    this.resetPasswordForm = this.fb.group({
      'email': ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });
    this.confirmResetPasswordForm = this.fb.group({
        'nouvPassword': ['', [Validators.required, Validators.minLength(8)]],
        'confirmPassword': ['', [Validators.required]],
      },
      {
        validator: this.mustMatchPwdService.mustMatch('nouvPassword', 'confirmPassword')
      });
  }
  ngOnInit() {
    if (window.location.href.endsWith("/resetpassword") == false) {
      //mode de saisir le nouvel mot de pass
      this.interfaceSaisiNouvPWD = true;
      this.interfaceSaisiEmail = false
    } else {
      this.route.queryParams.subscribe(params => {
          //this.resetPasswordService.onClickLinkFromMail(window.location.href)
        }
      )
    }
  }
  // convenience getter for easy access to form fields
  get showErrorMsg() {
    if (window.location.href.endsWith("/resetpassword") == false)
      return this.confirmResetPasswordForm.controls;
    else
      return this.resetPasswordForm.controls;
  }
  hideErrorMsg() {
    this.errorMsg = false
  }
  onSubmit() {
    this.submitted = true;
    this.model = <ResetPasswordModel>this.resetPasswordForm.value
    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      this.errorMsg = true
      return;
    }
    this.isLoading = true;
    this.resetPasswordService.sendEmail(this.model)
      .pipe(
        catchError(error => {
          this.isLoading = false;
          console.log("error forget pwd  here *******=> ", JSON.stringify(this.apiErrors.handleApiError(error)));
          return this.apiErrors.handleApiError(error);
        }))
      .subscribe(data => {
        this.isLoading = false;

          console.log(" out put api test " + JSON.stringify(data))
          this.notifications.notify('Verifier votre boite email pour consulter un mail  !');
          this.router.navigate(['/login']);

      });
  }
  validateNewPwd() {
    this.isValidated = true;
    // stop here if form is invalid
    if (this.confirmResetPasswordForm.invalid) {
      this.errorMsg = true
      return;
    }
    this.resetPasswordService.confirmPWD(window.location.href, { "password": this.confirmResetPasswordForm.controls["nouvPassword"].value })
      .pipe(
        catchError(error => {
          console.log("error forget pwd  here *******=> ", JSON.stringify(this.apiErrors.handleApiError(error)));
          return this.apiErrors.handleApiError(error);
        }))
      .subscribe(data => {
        console.log(" out put api test " + JSON.stringify(data))
        if (data.success) {
          this.notifications.notify('votre mot de pass a été rénisialisé avec succés');
          this.router.navigate(['/login']);
        }
      });
  }
}
