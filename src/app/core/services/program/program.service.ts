import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { ProgramI } from 'src/app/models/institution/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/Program`;
  base_path_get = `${this.API_URI}/api/Program`;

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

//  createItem(program: ProgramI): Observable<ProgramI> {
//    return this.http
//      .post<ProgramI>(this.base_path_post, JSON.stringify(program), this.httpOptions)
//      .pipe(
//        retry(2),
//        catchError(this.handleError)
//      )
//  }

createItem(program: ProgramI): Observable<ProgramI> {
  // console.log(program);
  return this.http.post<ProgramI>(this.base_path_post, program).pipe(tap(
    (res: ProgramI) => {
      if (res) {
        // Crear usuario
        // console.log('registro insertado');
      }
    })
  );
}

 // Get single student data by ID
 getItem(id: number): Observable<ProgramI> {
   return this.http
     .get<ProgramI>(this.base_path_get + '/' + id)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Get students data
 getList(): Observable<{ programs: ProgramI[] }> {
   return this.http
     .get<{ programs: ProgramI[] }>(this.base_path_get)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Update item by id
 updateItem(id:number, item:ProgramI): Observable<ProgramI> {
   return this.http
     .put<ProgramI>(this.base_path_get + '/' + id, JSON.stringify(item), this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Delete item by id
 deleteItem(id:number) {
   return this.http
     .delete<ProgramI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
}
