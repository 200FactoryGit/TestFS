import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ApiErrorsService } from '../../shared/api-errors.service';
import { LoginModel } from '../models/login.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private accessToken: string;
  constructor(private http: HttpClient,
    private apiErrors: ApiErrorsService,
    private router : Router,
    private notifications:NotificationService)
    { }
  login(model: LoginModel) {
    console.log(model)
    this.http.post(`${environment.apiBaseUrl}/user/login`, model)
      .pipe(
        catchError(error => {
          console.log("error login  here *******=> ", JSON.stringify(this.apiErrors.handleApiError(error)));

          return this.apiErrors.handleApiError(error);
        }))
      .subscribe(data => {
        console.log(' daata ' + JSON.parse(JSON.stringify(data)).status);
        if (JSON.parse(JSON.stringify(data)).status === 'LoginPasswordValid'){

          this.saveAuthTokens(data);
        }
        if (JSON.parse(JSON.stringify(data)).status === 'User Not Activated'){
          this.notifications.notify('Utilisateur non activé , contactez votre administrateur !');
        }
        if (JSON.parse(JSON.stringify(data)).status === 'PasswordInvalid'){
          this.notifications.notify('Mot de passe incorrect !');
        }
        if (JSON.parse(JSON.stringify(data)).status === 'LoginInvalid'){
          this.notifications.notify('Nom d\'utilisateur incorrect !');
        }

      });
  }
  private saveAuthTokens(data) {
    if (data) {
    if (JSON.parse(JSON.stringify(data)).status === 'LoginPasswordValid') {
        localStorage.setItem('token', 'string');
        localStorage.setItem('Project:e-expertise:currentUser', JSON.stringify(data));
        this.accessToken = 'string';
        console.log('hereeeeeeeeeeeeee')
        this.router.navigate(['/home/welcome']);
      }
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('Project:e-expertise:currentUser');
      this.accessToken = null;
    }
  }
  isAuthenticated(): boolean {
    return typeof(localStorage.getItem('token')) !== 'undefined' && localStorage.getItem('token') !== null;
  }
  logout() {
    this.saveAuthTokens(null);
    console.log('reading from logout function');
    this.router.navigate(['/login']);
  }

}
