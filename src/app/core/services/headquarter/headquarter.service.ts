import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { HeadquarterI, HeadquarterProgramI } from 'src/app/models/institution/headquarter';

@Injectable({
  providedIn: 'root'
})
export class HeadquarterService {

  API_URI = environment.API_URI;

   // API path
  base_path_post = `${this.API_URI}/api/Headquarter`;
  base_path_get = `${this.API_URI}/api/Headquarter`;

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
  createItem(headq: HeadquarterI): Observable<HeadquarterI> {
    return this.http.post<HeadquarterI>(this.base_path_post, headq).pipe(tap(
      (res: HeadquarterI) => {
        if (res) {
          // Crear usuario
          // console.log('registro insertado');
        }
      })
    );
  }

  // Get single student data by ID
  getItem(id: number): Observable<{headquarter:HeadquarterI}> {
    return this.http
      .get<{headquarter:HeadquarterI}>(this.base_path_get + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get students data

  getList(): Observable<{ headquarters: HeadquarterI[] }> {
    return this.http
      .get<{ headquarters: HeadquarterI[] }>(this.base_path_get)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  HeadquarterProgram(): Observable<{ headquarterProgram: HeadquarterProgramI[] }> {
    return this.http
      .get<{ headquarterProgram: HeadquarterProgramI[] }>(this.API_URI+'/api/HeadquarterProgram')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  
  // Update item by id
  updateItem(id:number, item:HeadquarterI): Observable<{headquarter:HeadquarterI}> {
    return this.http
      .patch<{headquarter:HeadquarterI}>(this.base_path_get + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteItem(id:number) {
    return this.http
      .delete<HeadquarterI>(this.base_path_get + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  
}
