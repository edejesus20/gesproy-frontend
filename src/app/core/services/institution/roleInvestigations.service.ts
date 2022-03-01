import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RoleInvestigationI } from 'src/app/models/institution/roles_investigation';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RoleInvestigationsService {

  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/RoleInvestigation`;
  base_path_get = `${this.API_URI}/api/RoleInvestigation`;

constructor(private http: HttpClient) { }

// Http Options
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

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


// Create a new item
createItem(seedbeds: RoleInvestigationI): Observable<RoleInvestigationI> {
  return this.http
    .post<RoleInvestigationI>(this.base_path_post, JSON.stringify(seedbeds), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getItem(id: number): Observable<{roleInvestigation:RoleInvestigationI}> {
  return this.http
    .get<{roleInvestigation:RoleInvestigationI}>(this.base_path_get + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get students data
getList(): Observable<{ roleInvestigations: RoleInvestigationI[] }> {
 return this.http
   .get<{ roleInvestigations: RoleInvestigationI[] }>(this.base_path_get)
   .pipe(
     retry(2),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, roleInvestigation:RoleInvestigationI): Observable<RoleInvestigationI> {
  return this.http
    .patch<RoleInvestigationI>(this.base_path_get + '/' + id, JSON.stringify(roleInvestigation), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<RoleInvestigationI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
}
