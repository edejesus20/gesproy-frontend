import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { StudentI } from 'src/app/models/user/student';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  API_URI = environment.API_URI;

  // API path
 base_path_post = `${this.API_URI}/api/Student`;
 base_path_get = `${this.API_URI}/api/Student`;

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
 createItem(student: StudentI): Observable<StudentI> {
   return this.http.post<StudentI>(this.base_path_post, student).pipe(
     tap((res: StudentI) => {
       if (res) {
         // Crear usuario
         // console.log('registro insertado');
       }
     }),
     catchError(this.handleError))
 }

 // Get single student data by ID
 getItem(id: number): Observable<{student:StudentI}> {
   return this.http
     .get<{student:StudentI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Get students data

 getList(): Observable<{ students: StudentI[] }> {
   return this.http
     .get<{ students: StudentI[] }>(this.base_path_get)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Update item by id
 updateItem(id:number, student:StudentI): Observable<StudentI> {
   return this.http
     .patch<StudentI>(this.base_path_get + '/' + id, JSON.stringify(student), this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Delete item by id
 deleteItem(id:number) {
   return this.http
     .delete<StudentI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
}
