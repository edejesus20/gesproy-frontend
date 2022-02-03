import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { CambiarPasswordI } from 'src/app/models/authorization/usr_CambiarPassword';
import { UserI } from 'src/app/models/authorization/usr_User';
import { environment } from 'src/environments/environment';
import { PersonI } from 'src/app/models/user/person';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URI = environment.API_URI;

  // API path
  base_path = `${this.API_URI}/api/user`;
  base= `${this.API_URI}/api/change-password`;
  constructor(private http: HttpClient,
    ) {  
  }

  // Http Options
  


// Handle API errors
handleError(res: Response) {
  const statusCode = res.status;
  const body = res;
  const error = {
    statusCode: statusCode,
    error: body
  };
  return throwError(error.error);

};
// Get students data
getUser(): Observable<{users: PersonI[]}> {
  let token : string | null=localStorage.getItem('token')
  if(token != null) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token':token
      })
    }
    // console.log(httpOptions)
    return this.http
      .get<{users: PersonI[]}>(this.base_path,httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }else{
    return this.http
    .get<{users: PersonI[]}>(this.base_path)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}
getUserIdentificacion(cc:string): Observable<{ user: UserI }> {
  return this.http
    .get<{ user: UserI }>(this.base_path+ '/cc/' + cc)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getOneUser(id: number): Observable<{ user: UserI }> {
  return this.http
    .get<{ user: UserI }>(this.base_path + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}



createUser(user: UserI): Observable<{ user: UserI }> {
  //console.log(user,'----------------');
  return this.http
    .post<{ user: UserI }>(this.base_path, JSON.stringify(user))
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

actualzarContraseña(user: CambiarPasswordI): Observable<{ user: CambiarPasswordI }> {
  //console.log(user,'----------------');
  return this.http
    .patch<{ user: CambiarPasswordI }>(this.base, JSON.stringify(user))
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
updateUser(user:UserI){
  return this.http.patch(`${this.base_path}/${user.id}`, user).pipe(
    retry(2),
    catchError(this.handleError)
  )

}
eliminarUser(id:number){
  return this.http.delete(`${this.base_path}/${id}`).pipe(
    retry(2),
    catchError(this.handleError)
  )
}


}
