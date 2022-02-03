import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GroupI } from 'src/app/models/institution/group';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/Group`;
  base_path_get = `${this.API_URI}/api/Group`;

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
createItem(group: GroupI): Observable<GroupI> {
  return this.http
    .post<GroupI>(this.base_path_post, JSON.stringify(group), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getItem(id: number): Observable<{group:GroupI}> {
  return this.http
    .get<{group:GroupI}>(this.base_path_get + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get students data
getList(): Observable<{ groups: GroupI[] }> {
 return this.http
   .get<{ groups: GroupI[] }>(this.base_path_get)
   .pipe(
     retry(2),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, group:GroupI): Observable<GroupI> {
  return this.http
    .patch<GroupI>(this.base_path_get + '/' + id, JSON.stringify(group), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<GroupI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
}
