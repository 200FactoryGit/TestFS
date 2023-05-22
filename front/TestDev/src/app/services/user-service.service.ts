import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
userGet:string;
// userDelete:string;
// userUpdate:string;
  constructor(private httpClient: HttpClient) {
    this.userGet =
    environment.urlApiGateway+'api/user/all';   
  }

  getUsers(token:any){ 
    console.log("sdfdsfdsffdsfdsfsfsd");
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`})  
    return this.httpClient.get(this.userGet,{headers:headers});
  }
  // updateUsers(){ 
  //   return this.httpClient.put<Activity[]>(this.ActivityGetBystatusUrl);
  // }
  // deleteUsers(){ 
  //   return this.httpClient.delete<Activity[]>(this.ActivityGetBystatusUrl);
  // }
}

 
