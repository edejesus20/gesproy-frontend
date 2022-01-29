import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SeedbedI } from 'src/app/models/institution/seedbed';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeedbedService {
  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/Seedbed`;
  base_path_get = `${this.API_URI}/api/Seedbed`;

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


// Create a new item
createItem(seedbeds: SeedbedI): Observable<SeedbedI> {
  return this.http
    .post<SeedbedI>(this.base_path_post, JSON.stringify(seedbeds), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getItem(id: number): Observable<SeedbedI> {
  return this.http
    .get<SeedbedI>(this.base_path_get + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get students data
getList(): Observable<{ seedbeds: SeedbedI[] }> {
 return this.http
   .get<{ seedbeds: SeedbedI[] }>(this.base_path_get)
   .pipe(
     retry(2),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, item:SeedbedI): Observable<SeedbedI> {
  return this.http
    .put<SeedbedI>(this.base_path_get + '/' + id, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<SeedbedI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
}
