import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ColcienciaCategoryI } from 'src/app/models/institution/colciencias_category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColcienciaCategoryService {



  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/ColcienciaCategory`;
  base_path_get = `${this.API_URI}/api/ColcienciaCategory`;

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
createItem(seedbeds: ColcienciaCategoryI): Observable<ColcienciaCategoryI> {
  return this.http
    .post<ColcienciaCategoryI>(this.base_path_post, JSON.stringify(seedbeds), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getItem(id: number): Observable<ColcienciaCategoryI> {
  return this.http
    .get<ColcienciaCategoryI>(this.base_path_get + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get students data
getList(): Observable<{ colcienciaCategorys: ColcienciaCategoryI[] }> {
 return this.http
   .get<{ colcienciaCategorys: ColcienciaCategoryI[] }>(this.base_path_get)
   .pipe(
     retry(2),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, item:ColcienciaCategoryI): Observable<ColcienciaCategoryI> {
  return this.http
    .put<ColcienciaCategoryI>(this.base_path_get + '/' + id, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<ColcienciaCategoryI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
}
