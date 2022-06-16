import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AdministrativeI } from 'src/app/models/user/administrative';

@Injectable({
  providedIn: 'root'
})
export class AdministrativeService {

  API_URI = environment.API_URI;

  // API path
 base_path_post = `${this.API_URI}/api/Administrative`;
 base_path_get = `${this.API_URI}/api/Administrative`;

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
 createItem(headq: AdministrativeI): Observable<AdministrativeI> {
   return this.http.post<AdministrativeI>(this.base_path_post, headq).pipe(
     tap((res: AdministrativeI) => {
       if (res) {
         // Crear usuario
         // console.log('registro insertado');
       }
     }),
     catchError(this.handleError))
 }

 // Get single student data by ID
 getItem(id: number): Observable<{administrative:AdministrativeI}> {
   return this.http
     .get<{administrative:AdministrativeI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 // Get students data

 getList(): Observable<{ administratives: AdministrativeI[] }> {
   return this.http
     .get<{ administratives: AdministrativeI[] }>(this.base_path_get)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }
 getTipoAdministrative(tipo:string): Observable<{ administrativos: any[]}> {
  return this.http
    .get<{ administrativos: any[]}>(this.base_path_get+ '/tipo/' + tipo)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}
getAdministrativesOneTipo(id:number): Observable<{ administrativos: any[]}> {
  return this.http
    .get<{ administrativos: any[]}>(this.base_path_get+ '/tipoOne/' + id)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}


 // Update item by id
 updateItem(id:number, administrative:AdministrativeI): Observable<AdministrativeI> {
   return this.http
     .patch<AdministrativeI>(this.base_path_get + '/' + id, JSON.stringify(administrative), this.httpOptions)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 // Delete item by id
 deleteItem(id:number) {
   return this.http
     .delete<AdministrativeI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }
}
