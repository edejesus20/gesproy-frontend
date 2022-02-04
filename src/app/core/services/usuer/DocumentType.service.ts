import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DocumentTypeI } from 'src/app/models/user/document_types';
@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {
  API_URI = environment.API_URI;

  // API path
 base_path_post = `${this.API_URI}/api/documentType`;
 base_path_get = `${this.API_URI}/api/documentType`;

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
 createItem(documentType: DocumentTypeI): Observable<DocumentTypeI> {
   return this.http.post<DocumentTypeI>(this.base_path_post, documentType).pipe(
     tap((res: DocumentTypeI) => {
       if (res) {
         // Crear usuario
         // console.log('registro insertado');
       }
     }),
     catchError(this.handleError))
 }

 // Get single student data by ID
 getItem(id: number): Observable<{documentType:DocumentTypeI}> {
   return this.http
     .get<{documentType:DocumentTypeI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Get students data

 getList(): Observable<{ documentTypes: DocumentTypeI[] }> {
   return this.http
     .get<{ documentTypes: DocumentTypeI[] }>(this.base_path_get)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Update item by id
 updateItem(id:number, documentType:DocumentTypeI): Observable<DocumentTypeI> {
   return this.http
     .patch<DocumentTypeI>(this.base_path_get + '/' + id, JSON.stringify(documentType), this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Delete item by id
 deleteItem(id:number) {
   return this.http
     .delete<DocumentTypeI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
}
