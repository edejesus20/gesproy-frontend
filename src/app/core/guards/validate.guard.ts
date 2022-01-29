import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { createMenu } from 'src/app/consts/menu';
import { listaMenuI } from 'src/app/models/menu';
import { UserLoginResponseI } from 'src/app/models/authorization/usr_User';
import { AnonimoService } from '../services/auth/anonimo.service';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/usuarios/user.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      // console.log('canActivate')
        if (this.authService.getToken() == of(false)) {
        this.router.navigateByUrl('/landing');
        return of(false);
      }
      // this.router.navigate(['']);
      return of(true)
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean >|  boolean {
      // console.log('canLand')
      if (this.authService.getToken() == of(false)) {
        this.router.navigateByUrl('/landing');
        return of(false);
      }
      // this.router.navigate(['']);

      // this.router.navigateByUrl('/landing');
      return of(true)
  }
}
