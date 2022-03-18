import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { ProgramI } from 'src/app/models/institution/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/Program`;
  base_path_get = `${this.API_URI}/api/Program`;

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

//  createItem(program: ProgramI): Observable<ProgramI> {
//    return this.http
//      .post<ProgramI>(this.base_path_post, JSON.stringify(program), this.httpOptions)
//      .pipe(
//        retry(2),
//        catchError(this.handleError)
//      )
//  }

createItem(program: ProgramI): Observable<ProgramI> {
  return this.http.post<ProgramI>(this.base_path_post, program).pipe(tap(
    (res: ProgramI) => {
      if (res) {
      }
    })
  );
}

 // Get single student data by ID
 getItem(id: number): Observable<{program:ProgramI}> {
   return this.http
     .get<{program:ProgramI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Get students data
 getList(): Observable<{ programs: ProgramI[] }> {
   return this.http
     .get<{ programs: ProgramI[] }>(this.base_path_get)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Update item by id
 updateItem(id:number, item:ProgramI): Observable<ProgramI> {
   return this.http
     .patch<ProgramI>(this.base_path_get + '/' + id, JSON.stringify(item), this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
 vincularLine(id:number, item:any): Observable<any> {
  return this.http
    .patch<any>(this.API_URI + '/api/VincularLineProgram/' + id, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
 // Delete item by id
 deleteItem(id:number) {
   return this.http
     .delete<ProgramI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
}
