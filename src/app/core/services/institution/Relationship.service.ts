import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RelationshipI } from 'src/app/models/institution/relationship';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {

  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/Relationship`;
  base_path_get = `${this.API_URI}/api/Relationship`;

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
createItem(seedbeds: RelationshipI): Observable<RelationshipI> {
  return this.http
    .post<RelationshipI>(this.base_path_post, JSON.stringify(seedbeds), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getItem(id: number): Observable<RelationshipI> {
  return this.http
    .get<RelationshipI>(this.base_path_get + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get students data
getList(): Observable<{ relationships: RelationshipI[] }> {
 return this.http
   .get<{ relationships: RelationshipI[] }>(this.base_path_get)
   .pipe(
     retry(2),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, item:RelationshipI): Observable<RelationshipI> {
  return this.http
    .put<RelationshipI>(this.base_path_get + '/' + id, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<RelationshipI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
}
