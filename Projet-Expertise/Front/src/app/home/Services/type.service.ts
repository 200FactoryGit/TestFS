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
export class TypeService {

  constructor(private http: HttpClient) {

  }


  getAllType(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/type/list`);
  }
  delete(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/type/delete`, model);
  }
  add(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/type/create`, model);
  }
}
