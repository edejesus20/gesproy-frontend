import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { ThematicI } from 'src/app/models/projet/line';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ThematicService {

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
 createItem(thematic: ThematicI): Observable<ThematicI> {
   return this.http.post<ThematicI>(this.base_path_post, thematic).pipe(
     tap((res: ThematicI) => {
       if (res) {
         // Crear usuario
         // console.log('registro insertado');
       }
     }),
     catchError(this.handleError))
 }

 // Get single student data by ID
 getItem(id: number): Observable<{thematic:ThematicI}> {
   return this.http
     .get<{thematic:ThematicI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Get students data

 getList(): Observable<{ thematics: ThematicI[] }> {
   return this.http
     .get<{ thematics: ThematicI[] }>(this.base_path_get)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Update item by id
 updateItem(id:number, thematic:ThematicI): Observable<ThematicI> {
   return this.http
     .patch<ThematicI>(this.base_path_get + '/' + id, JSON.stringify(thematic), this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Delete item by id
 deleteItem(id:number) {
   return this.http
     .delete<ThematicI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
}
