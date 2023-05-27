import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ActivateCompteService {
  constructor(private http: HttpClient, private router: Router) { }
  sendToken(url: string): Observable<any> {
    const idTokenParams = url.split('activate')[1];
    return this.http.get(`${environment.apiBaseUrl}/user/activate` + idTokenParams + '/');
  }
}
