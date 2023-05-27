import {
  AfterViewInit,
  Component,
  ElementRef, HostListener,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router, Event} from '@angular/router';

import {interval, Subscription, timer} from 'rxjs';
import {ToastrService} from 'ngx-toastr';


import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css'],
})
export class DefaultLayoutComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  public isAdmin = false;
  public isUser = true;
  public lastName;
  public firstName;
  public nbNotif: any;
  public hasNotif = false;

  source2 = interval(6000);
  source = interval(1500);
  subscription: Subscription;


  constructor( private snackBar: MatSnackBar, private toastr: ToastrService, private route: Router) {
    this.nbNotif = 0;
    this.route.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator

      }

      if (event instanceof NavigationEnd) {
        if (localStorage.getItem('Project:e-expertise:currentUser') !== null) {
          this.firstName = JSON.parse(localStorage.getItem('Project:e-expertise:currentUser')).fname;
          this.lastName = JSON.parse(localStorage.getItem('Project:e-expertise:currentUser')).lname;
        }

        // Hide loading indicator
        console.log(event.url);

      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
    if (localStorage.getItem('Project:e-expertise:currentUser') !== null){
      if (JSON.parse(localStorage.getItem('Project:e-expertise:currentUser')).role === 'admin') {
        this.isAdmin = true;
        this.isUser = false;
      } else {
        this.isAdmin = false;
        this.isUser = true;
      }
    } else {
      this.route.navigate(['login']);
    }

  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    this.route.navigate(['/']);
  }
  ngAfterViewInit() {


  }

  ngOnDestroy() {

  }



  ngOnInit(): void {

    this.firstName = JSON.parse(localStorage.getItem('Project:e-expertise:currentUser')).firstName;
    this.lastName = JSON.parse(localStorage.getItem('Project:e-expertise:currentUser')).lastName;
    console.log(JSON.parse(localStorage.getItem('Project:e-expertise:currentUser')));

  }

  ngOnChanges(changes: SimpleChanges): void {

  }


  showNotification(message) {
    this.snackBar.open(message, 'X', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

}
