import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Research_bondingI } from 'src/app/models/institution/charge_bonding';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Research_bondingService {

  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/research_bonding`;
  base_path_get = `${this.API_URI}/api/research_bonding`;

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
createItem(research_bonding: Research_bondingI): Observable<Research_bondingI> {
  return this.http
    .post<Research_bondingI>(this.base_path_post, JSON.stringify(research_bonding), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getItem(id: number): Observable<{research_bonding:Research_bondingI}> {
  return this.http
    .get<{research_bonding:Research_bondingI}>(this.base_path_get + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get students data
getList(): Observable<{ research_bondings: Research_bondingI[] }> {
 return this.http
   .get<{ research_bondings: Research_bondingI[] }>(this.base_path_get)
   .pipe(
     retry(2),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, research_bonding:Research_bondingI): Observable<Research_bondingI> {
  return this.http
    .patch<Research_bondingI>(this.base_path_get + '/' + id, JSON.stringify(research_bonding), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<Research_bondingI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
}
