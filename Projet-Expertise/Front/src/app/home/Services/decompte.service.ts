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
export class DecompteService {

  constructor(private http: HttpClient) {

  }


  getAllDecompte(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/decompte/list`);
  }
  delete(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/decompte/delete`, model);
  }
  add(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/decompte/create`, model);
  }
  getByID(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/decompte/getbyid`, model);
  }
  getByIDDecompte(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/decompte/getbyidDcompte`, model);
  }

  edit(modal): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/decompte/edit`, modal);
  }
}
