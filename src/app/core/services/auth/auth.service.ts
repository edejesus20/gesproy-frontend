import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { listaMenuI } from 'src/app/models/menu';
import { catchError, retry, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserI, UserLoginI, UserLoginResponseI } from 'src/app/models/authorization/usr_User';
import { environment } from 'src/environments/environment';
import { createMenu } from 'src/app/consts/menu';
import { Router } from '@angular/router';
const KEY_TOKEN = 'token';
const KEY_USER = 'user';
const KEY_MENU = 'menu';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = environment.API_URI;
  public _KEY_CODE_TOKEN='';
  private _isLoggedIn = false;
  public isLoggedIn$ = new BehaviorSubject(this._isLoggedIn);
  // public KEY_CODE_TOKEN$ = new BehaviorSubject(this._KEY_CODE_TOKEN);
  public userLoginResponse:UserLoginResponseI={
    user:{username:'',id:0},
    token: ''
  }
  public userLoginResponse$ = new BehaviorSubject(this.userLoginResponse);
  // API path
  base_path_get = `${this.API_URI}/api/mainSesionAdmin`;
  base_path_get2 = `${this.API_URI}/api/mainSesion`;
  base_path_get_login = `${this.API_URI}/api/login`;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { 
    // this.getToken()
  }

  public get isLoggedIn() {
    return this._isLoggedIn;
  }
  public get KEY_CODE_TOKEN() {
    return this._KEY_CODE_TOKEN;
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getMenu(): Observable<{ mainSesionAdmin: listaMenuI[] }> {
    return this.http
      .get<{ mainSesionAdmin: listaMenuI[] }>(this.base_path_get)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getMenu2(userLoginResponse:UserLoginResponseI): Observable<{ mainSesion: listaMenuI[] }> {
    const data={
      userId:userLoginResponse.user.id,
      token:userLoginResponse.token,
    }
    return this.http
      .post<{ mainSesion: listaMenuI[] }>(this.base_path_get2,data)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  setLogin(value: boolean): void {
    this._isLoggedIn = value;
    this.isLoggedIn$.next(value);
  }

  public register(user: UserI): Observable<UserLoginResponseI> {
    return this.http.post<UserLoginResponseI>(`${this.API_URI}/user`, user).pipe(tap(
      (res: UserLoginResponseI) => {
        if (res) {
          // localStorage.setItem(KEY_MENU, JSON.stringify(res.menu));
          this.userLoginResponse$.next(res)
          this.setLoginData(res);
          this.setLogin(true);
        }
      })
    );
  }
  login(dataLogin: UserLoginI): Observable<UserLoginResponseI> {
    return this.http.post<UserLoginResponseI>(this.base_path_get_login, dataLogin).pipe(tap(
      (res: UserLoginResponseI) => {
        if (res) {
          // console.log(res)
          // localStorage.setItem(KEY_MENU, JSON.stringify(res.menu));
          this.setLoginData(res);
          this.userLoginResponse$.next(res)
          this.setLogin(true);
        }
      })
    );
  }

  private setLoginData(loginData: UserLoginResponseI): void {
    localStorage.setItem(KEY_TOKEN, loginData.token);
    this._KEY_CODE_TOKEN=loginData.token;
    // console.log(this._KEY_CODE_TOKEN)
    // const userData = this.decodeUserData(token);
    // localStorage.setItem(KEY_USER, JSON.stringify(userData));
    localStorage.setItem(KEY_USER, JSON.stringify(loginData.user));
  }

  public logout(): void {
    localStorage.removeItem(KEY_TOKEN);
    this._KEY_CODE_TOKEN='';
    localStorage.removeItem(KEY_USER);
    // localStorage.removeItem(KEY_MENU);
    // TODO: Call logout service (backend) to remove TOKEN for sessions
  }
  public getToken(): Observable<boolean> | boolean {
    var token :string | null= JSON.stringify(localStorage.getItem('token'));
    var user :string | null= localStorage.getItem('user');
    // var menu :string | null= localStorage.getItem('menu');
    if(this.isLoggedIn$.value==true){
      // this.router.navigateByUrl('/dashboard');
      return true;
    }else{
      if (token!=null !=null && user!=null) {
        let userObjeto:any = JSON.parse(user); 
        // let menuObjeto:any = JSON.parse(menu); 
        let userLoginResponse={
          user:userObjeto,
          token:token,
          // menu:menuObjeto
        }
        this.setLogin(true)
        this.userLoginResponse=userLoginResponse
        this.userLoginResponse$.next(userLoginResponse)
          // createMenu(menuObjeto.mainSesion)
          // this.router.navigateByUrl('/dashboard');
      return true;
    }
    }

  this.router.navigateByUrl('/landing');
  return false
  }

}
