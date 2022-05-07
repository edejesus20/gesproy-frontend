import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Thematic_axisI } from 'src/app/models/projet/line';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Thematic_axisService {

  API_URI = environment.API_URI;

  // API path
 base_path_post = `${this.API_URI}/api/Thematic`;
 base_path_get = `${this.API_URI}/api/Thematic`;

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
 createItem(thematic_axis: Thematic_axisI): Observable<Thematic_axisI> {
   return this.http.post<Thematic_axisI>(this.base_path_post, thematic_axis).pipe(
     tap((res: Thematic_axisI) => {
       if (res) {
         // Crear usuario
         // console.log('registro insertado');
       }
     }),
     catchError(this.handleError))
 }

 // Get single student data by ID
 getItem(id: number): Observable<{thematic_axis:Thematic_axisI}> {
   return this.http
     .get<{thematic_axis:Thematic_axisI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Get students data

 getList(): Observable<{ thematic_axiss: Thematic_axisI[] }> {
   return this.http
     .get<{ thematic_axiss: Thematic_axisI[] }>(this.base_path_get)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Update item by id
 updateItem(id:number, thematic_axis:Thematic_axisI): Observable<Thematic_axisI> {
   return this.http
     .patch<Thematic_axisI>(this.base_path_get + '/' + id, JSON.stringify(thematic_axis), this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Delete item by id
 deleteItem(id:number) {
   return this.http
     .delete<Thematic_axisI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
}
