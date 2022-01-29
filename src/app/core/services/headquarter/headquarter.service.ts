import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { HeadquarterI } from 'src/app/models/institution/headquarter';

@Injectable({
  providedIn: 'root'
})
export class HeadquarterService {

  API_URI = environment.API_URI;

   // API path
  base_path_post = `${this.API_URI}/api/Headquarter`;
  base_path_get = `${this.API_URI}/api/Headquarter`;

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
  createItem(headq: HeadquarterI): Observable<HeadquarterI> {
    return this.http.post<HeadquarterI>(this.base_path_post, headq).pipe(tap(
      (res: HeadquarterI) => {
        if (res) {
          // Crear usuario
          // console.log('registro insertado');
        }
      })
    );
  }

  // Get single student data by ID
  getItem(id: number): Observable<HeadquarterI> {
    return this.http
      .get<HeadquarterI>(this.base_path_get + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get students data

  getList(): Observable<{ headquarters: HeadquarterI[] }> {
    return this.http
      .get<{ headquarters: HeadquarterI[] }>(this.base_path_get)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update item by id
  updateItem(id:number, item:HeadquarterI): Observable<HeadquarterI> {
    return this.http
      .put<HeadquarterI>(this.base_path_get + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteItem(id:number) {
    return this.http
      .delete<HeadquarterI>(this.base_path_get + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
}
