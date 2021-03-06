import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Kind_of_InvestigationI } from 'src/app/models/projet/projet';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class Kind_of_InvestigationService {

  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/Kind_of_Investigation`;
  base_path_get = `${this.API_URI}/api/Kind_of_Investigation`;

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
createItem(kind_of_Investigation: Kind_of_InvestigationI): Observable<Kind_of_InvestigationI> {
  return this.http
    .post<Kind_of_InvestigationI>(this.base_path_post, JSON.stringify(kind_of_Investigation), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getItem(id: number): Observable<{kind_of_Investigation:Kind_of_InvestigationI}> {
  return this.http
    .get<{kind_of_Investigation:Kind_of_InvestigationI}>(this.base_path_get + '/' + id)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Get students data
getList(): Observable<{ kind_of_Investigations: Kind_of_InvestigationI[] }> {
 return this.http
   .get<{ kind_of_Investigations: Kind_of_InvestigationI[] }>(this.base_path_get)
   .pipe(
     retry(0),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, kind_of_Investigation:Kind_of_InvestigationI): Observable<Kind_of_InvestigationI> {
  return this.http
    .patch<Kind_of_InvestigationI>(this.base_path_get + '/' + id, JSON.stringify(kind_of_Investigation), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<Kind_of_InvestigationI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}
}
