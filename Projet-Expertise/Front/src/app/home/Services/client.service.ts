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
export class ClientService {

  constructor(private http: HttpClient) {

  }


  getAllClients(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/client/list`);
  }
  delete(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/client/delete`, model);
  }
  add(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/client/create`, model);
  }
  getByID(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/client/getById`, model);
  }
  edit(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/client/edit`, model);
  }
  getByIdentifiant(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/client/getByIdentifiant`, model);
  }
}
