import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {listaMenuI } from '../../../models/menu';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnonimoService {

  API_URI = environment.API_URI;

   // API path
   base_path_get = `${this.API_URI}/api/mainDefault`;

  constructor(
    private http: HttpClient,
  ) { }

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

getMenu(): Observable<{ mainDefault: listaMenuI[] }> {
  return this.http
    .get<{ mainDefault: listaMenuI[] }>(this.base_path_get)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}


}
