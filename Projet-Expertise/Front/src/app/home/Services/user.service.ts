import {Injectable} from '@angular/core';
import {Observable, observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EditUserModel} from '../Models/editUser.model';
import {ApiErrorsService} from 'src/app/shared/api-errors.service';

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient, private apiErrors: ApiErrorsService) {}

  updateUser(model: EditUserModel): Observable<EditUserModel> {
    // addd header
    //  'Content-Type': 'application/json;charset=utf-8'
    //https://stackoverflow.com/questions/20000176/patch-request-using-angularjs
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    return this.http
      .post<EditUserModel>(
        `${environment.apiBaseUrl}/user/userprofile/` + model.id,
        model,
        { headers: headers }
      )
      .pipe(
        catchError((error) => {
          return this.apiErrors.handleApiError(error);
        })
      );
  }

  getUser(Id): Observable<EditUserModel> {
    const token = localStorage.getItem("token");

    return this.http
      .get<EditUserModel>(`${environment.apiBaseUrl}/user/getById/` + Id)
      .pipe(
        catchError((error) => {
          return this.apiErrors.handleApiError(error);
        })
      );
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/user/list`);
  }
  activate(model): Observable<any> {
    return this.http.post(
      `${environment.apiBaseUrl}/user/activate-user`,
      model
    );
  }
  desactivate(model): Observable<any> {
    return this.http.post(
      `${environment.apiBaseUrl}/user/desactivate-user`,
      model
    );
  }
  getUserById(idUser): Observable<any> {
    return this.http.get(
      `${environment.apiBaseUrl}/getUserById.php?id=` + idUser
    );
  }
  delete(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/user/delete`, model);
  }
  update(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/user/update`, model);
  }
}
