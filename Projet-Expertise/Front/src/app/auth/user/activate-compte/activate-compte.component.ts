import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';
import { catchError } from 'rxjs/operators';
import { ApiErrorsService } from 'src/app/shared/api-errors.service';
import { ActivateCompteService } from '../../services/ActivateCompteService';

@Component({
  selector: 'app-activate-compte',
  templateUrl: './activate-compte.component.html',
  styleUrls: ['./activate-compte.component.css']
})
export class ActivateCompteComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
    private activateCompteService: ActivateCompteService,
    private notifications: NotificationService,
    private apiErrors : ApiErrorsService) { }

  ngOnInit() {
 
    this.activateCompteService.sendToken(window.location.href)
    .pipe(
      catchError(error => {
        console.log("error register here *******=> ", JSON.stringify(this.apiErrors.handleApiError(error)));
        return this.apiErrors.handleApiError(error);
      }))
      .subscribe(data => {
        if (data.success === true) {
          this.notifications.notify('Votre compte a été activé, veillez se connecter ');
          this.router.navigate(['/login']);
        } else {
          this.notifications.notify('Votre compte n\'a pas été activé,veillez consulter votre administrateur');
        }
      })
  }
}


