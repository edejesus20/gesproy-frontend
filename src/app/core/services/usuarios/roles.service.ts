import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { assinRoleResourceI } from 'src/app/models/authorization/usr_assinRoleResource';
import { assinRoleUserI } from 'src/app/models/usr_assinRoleUser';
import { RoleI } from 'src/app/models/authorization/usr_roles';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  API_URI = environment.API_URI;

  // API path
  base_path = `${this.API_URI}/api/role`;
  base = `${this.API_URI}/api/`;

  constructor(private http: HttpClient) { }

  // Http Options
 httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
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

// Get students data
getRole(): Observable<{roles: RoleI[]}> {
  return this.http
    .get<{roles: RoleI[]}>(this.base_path)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getOneRole(id: number): Observable<{ role: RoleI }> {
  return this.http
    .get<{ role: RoleI }>(this.base_path + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}



createRole(role: RoleI): Observable<{ role: RoleI }> {
  //console.log(role,'----------------');
  return this.http
    .post<{ role: RoleI }>(this.base_path, JSON.stringify(role), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

assinRole(role: assinRoleUserI): Observable<{ role: assinRoleUserI }> {
  //console.log(role,'----------------');
  return this.http
    .post<{ role: assinRoleUserI }>(this.base + 'assinRole', JSON.stringify(role), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

assinRoleResource(array: assinRoleResourceI): Observable<{ array: assinRoleResourceI }> {
  //console.log(role,'----------------');
  return this.http
    .post<{ array: assinRoleResourceI }>(this.base + 'assinResourceRole', JSON.stringify(array), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

updateRole(role:RoleI){
  return this.http.patch(`${this.base_path}/${role.id}`, role).pipe(
    retry(2),
    catchError(this.handleError)
  )

}
eliminarRole(id:number){
  return this.http.delete(`${this.base_path}/${id}`).pipe(
    retry(2),
    catchError(this.handleError)
  )
}

}
