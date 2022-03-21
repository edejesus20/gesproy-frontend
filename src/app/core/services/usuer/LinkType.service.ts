import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { LinkTypeI } from 'src/app/models/user/teacher';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LinkTypeService {

  API_URI = environment.API_URI;

  // API path
 base_path_post = `${this.API_URI}/api/LinkType`;
 base_path_get = `${this.API_URI}/api/LinkType`;

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
 createItem(linkType: LinkTypeI): Observable<LinkTypeI> {
   return this.http.post<LinkTypeI>(this.base_path_post, linkType).pipe(
     tap((res: LinkTypeI) => {
       if (res) {
         // Crear usuario
         // console.log('registro insertado');
       }
     }),
     catchError(this.handleError))
 }

 // Get single student data by ID
 getItem(id: number): Observable<{linkType:LinkTypeI}> {
   return this.http
     .get<{linkType:LinkTypeI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Get students data

 getList(): Observable<{ linkTypes: LinkTypeI[] }> {
   return this.http
     .get<{ linkTypes: LinkTypeI[] }>(this.base_path_get)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Update item by id
 updateItem(id:number, linkType:LinkTypeI): Observable<LinkTypeI> {
   return this.http
     .patch<LinkTypeI>(this.base_path_get + '/' + id, JSON.stringify(linkType), this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Delete item by id
 deleteItem(id:number) {
   return this.http.delete<LinkTypeI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
}
