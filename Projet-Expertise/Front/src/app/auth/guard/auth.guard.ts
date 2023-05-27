import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  public errorMsg: boolean = false;
  constructor(private router: Router, private authentication: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authentication.isAuthenticated()) {
      return true;
    }

    // Si l'utilisateur n'est pas connecté, on le redirige vers la page de login
    this.authentication.logout();
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
