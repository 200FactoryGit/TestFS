import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { Form, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiErrorsService } from 'src/app/shared/api-errors.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { RegisterService } from '../services/register.service';
import { MustMatchPwdService } from 'src/app/shared/mustMatchPwd.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: RegisterModel = <RegisterModel>{};
  inscriptionForm: FormGroup;
  submitted: boolean = false;
  errorMsg: boolean = false;
  isLoading: boolean = false;
  emailPattern = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]{3,}\\.[A-Za-z]{2,3}';
  constructor(
    private router: Router,
    private fb: FormBuilder, private apiErrors: ApiErrorsService,
    private notifications: NotificationService,
    private registerService: RegisterService,
    private mustMatchPwdService: MustMatchPwdService) {
    this.inscriptionForm = this.fb.group({
      login: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, , Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required]],
    },
      {
        validator: this.mustMatchPwdService.mustMatch('password', 'password2')
      });
   // this.apiErrors.onError.subscribe(_ => { console.log('entring to error creatinng register'); this.setErrors(); });
  }

  ngOnInit() {
  }
  setErrors() {
    this.errorFromBakendMsg=true;
    let error = this.apiErrors.getErrors(location.pathname);
    let msg = "";
    if (error && error.status === 404) {
      console.log('error.errors' + error.errors);
      for (let item of error.errors) {
        msg += item['messages'];

      }
      this.notifications.notify(msg);
    }
    let messages;
    if (error && error.status === 400) {
      for (let item of error.errors) {


        messages = JSON.parse(JSON.stringify(item['messages']));
        if (messages) {
          for (var i = 0; i < messages.length; i++) {
            var singleCell = messages[i];

            msg = singleCell;
          }
        }

      }
      if (messages) {
        this.notifications.notify(msg);
      }
    }
    Object.keys(this.inscriptionForm.controls).forEach(key => {
      const control = this.inscriptionForm.get(key);
      // Suppression des erreurs de validation
      control.setErrors(null);
      // Obtention des Ă©ventuelles erreurs de validation
      let errors = this.apiErrors.getFieldErrors(location.pathname, key);
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
  // convenience getter for easy access to form fields
  errorFromBakendMsg=false;
  get showErrorMsg() { return this.inscriptionForm.controls; }
  hideErrorMsg() {
    this.errorMsg = false
    this.errorFromBakendMsg=false;
  }

  onSubmit() {
    this.submitted = true;
    this.model.fname = this.inscriptionForm.controls.first_name.value;
    this.model.lname = this.inscriptionForm.controls.last_name.value;
    this.model.password = this.inscriptionForm.controls.password.value;
    this.model.login = this.inscriptionForm.controls.login.value;
    this.model.email = this.inscriptionForm.controls.email.value;
    this.model.isactivated = false;
    this.model.role = 'user';
    // stop here if form is invalid
    if (this.inscriptionForm.invalid) {
      this.errorMsg = true
      return;
    }
    this.isLoading = true;
    console.log(this.model)
    this.registerService.register(this.model).subscribe(data => {
        this.isLoading = false;
          this.notifications.notify('Inscription avec succés !');
          this.router.navigate(['/login']);
        }, error => {
      console.log(error);
      this.isLoading = false;
      this.router.navigate(['/inscription']);
      this.notifications.notify('Une erreur est produite lors de l\'inscription !');});
  }
}
