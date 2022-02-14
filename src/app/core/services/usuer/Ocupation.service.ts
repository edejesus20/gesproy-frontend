import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { OcupationI } from 'src/app/models/user/ocupation';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OcupationService {
  API_URI = environment.API_URI;

  // API path
 base_path_post = `${this.API_URI}/api/Ocupation`;
 base_path_get = `${this.API_URI}/api/Ocupation`;

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
 createItem(ocupation: OcupationI): Observable<OcupationI> {
   return this.http.post<OcupationI>(this.base_path_post, ocupation).pipe(
     tap((res: OcupationI) => {
       if (res) {
         // Crear usuario
         // console.log('registro insertado');
       }
     }),
     catchError(this.handleError))
 }

 // Get single student data by ID
 getItem(id: number): Observable<{ocupation:OcupationI}> {
   return this.http
     .get<{ocupation:OcupationI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Get students data

 getList(): Observable<{ ocupations: OcupationI[] }> {
   return this.http
     .get<{ ocupations: OcupationI[] }>(this.base_path_get)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Update item by id
 updateItem(id:number, ocupation:OcupationI): Observable<OcupationI> {
   return this.http
     .patch<OcupationI>(this.base_path_get + '/' + id, JSON.stringify(ocupation), this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Delete item by id
 deleteItem(id:number) {
   return this.http
     .delete<OcupationI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
}
