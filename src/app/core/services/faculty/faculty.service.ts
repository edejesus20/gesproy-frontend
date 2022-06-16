import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { FacultyI } from 'src/app/models/institution/faculty';


@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  API_URI = environment.API_URI;

   // API path
   base_path_post = `${this.API_URI}/api/Faculty`;
   base_path_get = `${this.API_URI}/api/Faculty`;

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
 createItem(faculty: FacultyI): Observable<FacultyI> {
   return this.http
     .post<FacultyI>(this.base_path_post, JSON.stringify(faculty), this.httpOptions)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 // Get single student data by ID
 getItem(id: number): Observable<{faculty:FacultyI}> {
   return this.http
     .get<{faculty:FacultyI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 // Get students data
 getList(): Observable<{ facultys: FacultyI[] }> {
  return this.http
    .get<{ facultys: FacultyI[] }>(this.base_path_get)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

 // Update item by id
 updateItem(id:number, item:FacultyI): Observable<{faculty:FacultyI}> {
   return this.http
     .patch<{faculty:FacultyI}>(this.base_path_get + '/' + id, JSON.stringify(item), this.httpOptions)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 // Delete item by id
 deleteItem(id:number) {
   return this.http
     .delete<FacultyI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }
}
