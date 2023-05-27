import {Component, OnInit, EventEmitter, HostListener} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginModel } from '../models/login.model';
import { HttpClient, HttpHeaders, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, finalize } from "rxjs/operators";
import { throwError } from 'rxjs';
import { ApiRouteError } from '../models/ApiRouteError';
import { ApiErrorsService } from '../../shared/api-errors.service';
import { NotificationService } from '../../shared/notification.service';
import { AuthenticationService } from '../services/authentication.service';
import { ResetPasswordService } from '../services/resetPwd.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginModel = <LoginModel>{};
  loginForm: FormGroup;
  submitted = false;
  errorMsg = false;
  loginPattern = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]{3,}\\.[A-Za-z]{2,3}';
  errors: ApiRouteError[];
  onError: EventEmitter<boolean> = new EventEmitter();
  errorFromBakendMsg =false;
  constructor(private fb: FormBuilder, private http: HttpClient,
    private router: Router, private apiErrors: ApiErrorsService,
    private notifications: NotificationService,
    public authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private resetPasswordService: ResetPasswordService) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.apiErrors.onError.subscribe(_ => { console.log('entring to error creating login');

                                            this.setErrors(); });
  }
  ngOnInit() {
    localStorage.removeItem('commandList');
    console.log(' here from mail event click ');
    this.authenticationService.logout();
    localStorage.removeItem('Project:e-expertise:currentUser');
  }
  setErrors() {
    this.errorFromBakendMsg=true;
    const error = this.apiErrors.getErrors(location.pathname);
    let msg = '';
    if (error && error.status === 404) {
      console.log('error.errors' + error.errors);
      for (const item of error.errors) {
        msg += item['messages'];

      }
      this.notifications.notify(msg);
    }
    let messages;
    if (error && error.status === 400) {
      for (const item of error.errors) {


        messages = JSON.parse(JSON.stringify(item['messages']));
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
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
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
// ************ end 1 **************
  // 2- gé&rer les erreurs front End
	// convenience getter for easy access to form fields
	get showErrorMsg() { return this.loginForm.controls; }
  hideErrorMsg() {
    this.errorMsg = false;
    this.errorFromBakendMsg=false;
	}

  onSubmit() {

    this.submitted = true;

    this.model = this.loginForm.value as LoginModel
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.errorMsg = true;
      return;
    }

    this.authenticationService.login(this.model);
  /*  localStorage.setItem('token', 'XXXXXX');
    localStorage.setItem('Project:e-coffe:currentUser', 'user');
    if ((this.loginForm.get('login').value === 'admin') && (this.loginForm.get('password').value === 'admin2020')){
      localStorage.setItem('Project:e-coffe:currentUser', 'admin');
    }
    this.router.navigate(['home']);*/





  }
  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    this.router.navigate(['/']);
  }
}
