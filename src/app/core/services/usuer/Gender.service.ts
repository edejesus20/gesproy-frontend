import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { GenderI } from 'src/app/models/user/gender';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GenderService {
  API_URI = environment.API_URI;

  // API path
 base_path_post = `${this.API_URI}/api/gender`;
 base_path_get = `${this.API_URI}/api/gender`;

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
 createItem(gender: GenderI): Observable<GenderI> {
   return this.http.post<GenderI>(this.base_path_post, gender).pipe(
     tap((res: GenderI) => {
       if (res) {
         // Crear usuario
         // console.log('registro insertado');
       }
     }),
     catchError(this.handleError))
 }

 // Get single student data by ID
 getItem(id: number): Observable<{gender:GenderI}> {
   return this.http
     .get<{gender:GenderI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 // Get students data

 getList(): Observable<{ genders: GenderI[] }> {
   return this.http
     .get<{ genders: GenderI[] }>(this.base_path_get)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 // Update item by id
 updateItem(id:number, gender:GenderI): Observable<GenderI> {
   return this.http
     .patch<GenderI>(this.base_path_get + '/' + id, JSON.stringify(gender), this.httpOptions)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 // Delete item by id
 deleteItem(id:number) {
   return this.http
     .delete<GenderI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }
}
