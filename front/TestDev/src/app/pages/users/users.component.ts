import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  template: `
  
    <nb-layout-header fixed>
      <nb-user [name]="user?.name" [picture]="user?.picture"></nb-user>
    </nb-layout-header>
  `,
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  localtoken = {} ;
  constructor(private authService : NbAuthService, private httpClient : HttpClient , private  serviceUsers : UserServiceService ) {
    this.authService.onTokenChange()
    .subscribe(token  => {
    
      if (token.isValid()) {
        this.localtoken = token.getValue(); // here we receive a payload from the token and assigns it to our `user` variable 
      }
      
    });
    console.log(this.localtoken);
   }

  ngOnInit(): void {
    if(this.localtoken){
      this.getUsers(this.localtoken);
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
  }

  getUsers(token:any){
    this.serviceUsers.getUsers(token).subscribe((res)=>{
    console.log(res);
    })
  }

}
