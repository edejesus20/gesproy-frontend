import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MincienciaCategoryI } from 'src/app/models/institution/colciencias_category';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MincienciaCategoryService {



  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/MincienciaCategory`;
  base_path_get = `${this.API_URI}/api/MincienciaCategory`;

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
createItem(mincienciaCategory: MincienciaCategoryI): Observable<MincienciaCategoryI> {
  return this.http
    .post<MincienciaCategoryI>(this.base_path_post, JSON.stringify(mincienciaCategory), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getItem(id: number): Observable<{mincienciaCategory:MincienciaCategoryI}> {
  return this.http
    .get<{mincienciaCategory:MincienciaCategoryI}>(this.base_path_get + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get students data
getList(): Observable<{ mincienciaCategorys: MincienciaCategoryI[] }> {
 return this.http
   .get<{ mincienciaCategorys: MincienciaCategoryI[] }>(this.base_path_get)
   .pipe(
     retry(2),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, mincienciaCategory:MincienciaCategoryI): Observable<MincienciaCategoryI> {
  return this.http
    .patch<MincienciaCategoryI>(this.base_path_get + '/' + id, JSON.stringify(mincienciaCategory), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<MincienciaCategoryI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
}
