import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ProjectModalityI } from 'src/app/models/projet/projet';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjectModalityService {
  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/ProjectModality`;
  base_path_get = `${this.API_URI}/api/ProjectModality`;

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
createItem(projectModality: ProjectModalityI): Observable<ProjectModalityI> {
  return this.http
    .post<ProjectModalityI>(this.base_path_post, JSON.stringify(projectModality), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getItem(id: number): Observable<{projectModality:ProjectModalityI}> {
  return this.http
    .get<{projectModality:ProjectModalityI}>(this.base_path_get + '/' + id)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Get students data
getList(): Observable<{ projectModalitys: ProjectModalityI[] }> {
 return this.http
   .get<{ projectModalitys: ProjectModalityI[] }>(this.base_path_get)
   .pipe(
     retry(0),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, projectModality:ProjectModalityI): Observable<ProjectModalityI> {
  return this.http
    .patch<ProjectModalityI>(this.base_path_get + '/' + id, JSON.stringify(projectModality), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<ProjectModalityI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}
}
