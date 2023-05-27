import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiErrorsService } from 'src/app/shared/api-errors.service';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http:HttpClient,private apiErrors:ApiErrorsService,
    private router: Router )
   { }

   sendEmail(model):Observable<any> {
     console.log(model)
    return this.http.post(`${environment.apiBaseUrl}/user/forgetpassword/`, model)

  }
  confirmPWD(url,nvelPwd):Observable<any>{
    let idTokenParams = url.split("passwordreset")[1];
    return this.http.post(`${environment.apiBaseUrl}/user/passwordreset`+idTokenParams+`/`,nvelPwd);
  }
  updateUserPWd(model): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/user/changepassword`, model)
  }
}
