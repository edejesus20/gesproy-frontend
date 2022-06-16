import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Charge_bondingI } from 'src/app/models/user/teacher';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class Charge_bondingService {

  API_URI = environment.API_URI;

  // API path
 base_path_post = `${this.API_URI}/api/Charge_bonding`;
 base_path_get = `${this.API_URI}/api/Charge_bonding`;

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
 createItem(charge_bonding: Charge_bondingI): Observable<Charge_bondingI> {
   return this.http.post<Charge_bondingI>(this.base_path_post, charge_bonding).pipe(
     tap((res: Charge_bondingI) => {
       if (res) {
         // Crear usuario
         // console.log('registro insertado');
       }
     }),
     catchError(this.handleError))
 }

 // Get single student data by ID
 getItem(id: number): Observable<{charge_bonding:Charge_bondingI}> {
   return this.http
     .get<{charge_bonding:Charge_bondingI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 // Get students data

 getList(): Observable<{ charge_bondings: Charge_bondingI[] }> {
   return this.http
     .get<{ charge_bondings: Charge_bondingI[] }>(this.base_path_get)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 // Update item by id
 updateItem(id:number, charge_bonding:Charge_bondingI): Observable<Charge_bondingI> {
   return this.http
     .patch<Charge_bondingI>(this.base_path_get + '/' + id, JSON.stringify(charge_bonding), this.httpOptions)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 // Delete item by id
 deleteItem(id:number) {
   return this.http.delete<Charge_bondingI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }
}
