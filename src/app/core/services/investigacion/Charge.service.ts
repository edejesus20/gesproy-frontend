import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { ChargeI } from 'src/app/models/user/charge';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  API_URI = environment.API_URI;

  // API path
 base_path_post = `${this.API_URI}/api/Charge`;
 base_path_get = `${this.API_URI}/api/Charge`;

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
 createItem(charge: ChargeI): Observable<ChargeI> {
   return this.http.post<ChargeI>(this.base_path_post, charge).pipe(
     tap((res: ChargeI) => {
       if (res) {
         // Crear usuario
         // console.log('registro insertado');
       }
     }),
     catchError(this.handleError))
 }

 // Get single student data by ID
 getItem(id: number): Observable<{charge:ChargeI}> {
   return this.http
     .get<{charge:ChargeI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Get students data

 getList(): Observable<{ charges: ChargeI[] }> {
   return this.http
     .get<{ charges: ChargeI[] }>(this.base_path_get)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Update item by id
 updateItem(id:number, charge:ChargeI): Observable<ChargeI> {
   return this.http
     .patch<ChargeI>(this.base_path_get + '/' + id, JSON.stringify(charge), this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Delete item by id
 deleteItem(id:number) {
   return this.http
     .delete<ChargeI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
}
