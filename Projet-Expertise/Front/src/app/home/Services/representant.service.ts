import {Injectable} from '@angular/core';
import {Observable, observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EditUserModel} from '../Models/editUser.model';
import {ApiErrorsService} from 'src/app/shared/api-errors.service';

@Injectable({
  providedIn: 'root'
})
export class RepresentantService {

  constructor(private http: HttpClient) {

  }


  getAllRepresentants(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/representant/list`);
  }
  getAllRepresentantsByIdClient(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/representant/getByIdClient`, model);
  }
  delete(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/representant/delete`, model);
  }
  add(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/representant/create`, model);
  }
  getByID(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/representant/getById`, model);
  }
  edit(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/representant/edit`, model);
  }
}
