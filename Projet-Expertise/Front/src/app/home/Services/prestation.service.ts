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
export class PrestationService {

  constructor(private http: HttpClient) {

  }


  getAllPrestations(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/prestations/list`);
  }
  delete(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/prestations/delete`, model);
  }
  add(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/prestations/create`, model);
  }
  getByID(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/prestations/getbyid`, model);
  }
  edit(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/prestations/edit`, model);
  }
  getPdf(model): Observable<Blob> {

    return this.http.get(`${environment.apiBaseUrl}/prestations/getPdf/` + model , { responseType: 'blob' });

  }
}
