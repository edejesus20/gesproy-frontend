import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LineI } from 'src/app/models/projet/line';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LineService {


  API_URI = environment.API_URI;
  base_path_post = `${this.API_URI}/api/line`;
  base_path_get = `${this.API_URI}/api/line`;

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
createItem(line: LineI): Observable<LineI> {
  return this.http
    .post<LineI>(this.base_path_post, JSON.stringify(line), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getItem(id: number): Observable<LineI> {
  return this.http
    .get<LineI>(this.base_path_get + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get students data
getList(): Observable<{ lines: LineI[] }> {
 return this.http
   .get<{ lines: LineI[] }>(this.base_path_get)
   .pipe(
     retry(2),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, line:LineI): Observable<LineI> {
  return this.http
    .patch<LineI>(this.base_path_get + '/' + id, JSON.stringify(line), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<LineI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
}
