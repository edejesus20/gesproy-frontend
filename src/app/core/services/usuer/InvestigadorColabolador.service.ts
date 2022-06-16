import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { InvestigatorCollaboratorI } from 'src/app/models/user/investigator_colabolator';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InvestigadorColaboladorService {
  API_URI = environment.API_URI;

  // API path
 base_path_post = `${this.API_URI}/api/InvestigatorCollaborator`;
 base_path_get = `${this.API_URI}/api/InvestigatorCollaborator`;

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
 createItem(investigatorCollaborator: any): Observable<any> {
   return this.http.post<any>(this.base_path_post, investigatorCollaborator).pipe(
     tap((res: InvestigatorCollaboratorI) => {
       if (res) {
         // Crear usuario
         // console.log('registro insertado');
       }
     }),
     catchError(this.handleError))
 }

 // Get single student data by ID
 getItem(id: number): Observable<{investigatorCollaborator:InvestigatorCollaboratorI}> {
   return this.http
     .get<{investigatorCollaborator:InvestigatorCollaboratorI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 // Get students data

 getList(): Observable<{ investigatorCollaborators: InvestigatorCollaboratorI[] }> {
   return this.http
     .get<{ investigatorCollaborators: InvestigatorCollaboratorI[] }>(this.base_path_get)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 // Update item by id
 updateItem(id:number, investigatorCollaborator:any): Observable<any> {
   return this.http
     .patch<any>(this.base_path_get + '/' + id, JSON.stringify(investigatorCollaborator), this.httpOptions)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 // Delete item by id
 deleteItem(id:number) {
   return this.http
     .delete<InvestigatorCollaboratorI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }
}
