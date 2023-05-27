import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient,
    private router: Router) { }

  register(model: RegisterModel){



    return this.http.post(`${environment.apiBaseUrl}/user/register`, model, {responseType: 'text'});

  }
}
