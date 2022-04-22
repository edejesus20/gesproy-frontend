import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Knowledge_areaI } from 'src/app/models/institution/group';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class Knowledge_areaService {

  API_URI = environment.API_URI;

  // API path
 base_path_post = `${this.API_URI}/api/Knowledge_area`;
 base_path_get = `${this.API_URI}/api/Knowledge_area`;

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
 createItem(thematic: Knowledge_areaI): Observable<Knowledge_areaI> {
   return this.http.post<Knowledge_areaI>(this.base_path_post, thematic).pipe(
     tap((res: Knowledge_areaI) => {
       if (res) {
         // Crear usuario
         // console.log('registro insertado');
       }
     }),
     catchError(this.handleError))
 }

 // Get single student data by ID
 getItem(id: number): Observable<{knowledge_area:Knowledge_areaI}> {
   return this.http
     .get<{knowledge_area:Knowledge_areaI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Get students data

 getList(): Observable<{ knowledge_areas: Knowledge_areaI[] }> {
   return this.http
     .get<{ knowledge_areas: Knowledge_areaI[] }>(this.base_path_get)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Update item by id
 updateItem(id:number, knowledge_area:Knowledge_areaI): Observable<Knowledge_areaI> {
   return this.http
     .patch<Knowledge_areaI>(this.base_path_get + '/' + id, JSON.stringify(knowledge_area), this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Delete item by id
 deleteItem(id:number) {
   return this.http
     .delete<Knowledge_areaI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
}
