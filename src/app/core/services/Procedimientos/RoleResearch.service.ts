import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RoleResearchI } from 'src/app/models/projet/roles_research';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RoleResearchService {
  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/RoleResearch`;
  base_path_get = `${this.API_URI}/api/RoleResearch`;

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
createItem(roleResearch: RoleResearchI): Observable<RoleResearchI> {
  return this.http
    .post<RoleResearchI>(this.base_path_post, JSON.stringify(roleResearch), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getItem(id: number): Observable<{roleResearch:RoleResearchI}> {
  return this.http
    .get<{roleResearch:RoleResearchI}>(this.base_path_get + '/' + id)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Get students data
getList(): Observable<{ roleResearchs: RoleResearchI[] }> {
 return this.http
   .get<{ roleResearchs: RoleResearchI[] }>(this.base_path_get)
   .pipe(
     retry(0),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, roleResearch:RoleResearchI): Observable<RoleResearchI> {
  return this.http
    .patch<RoleResearchI>(this.base_path_get + '/' + id, JSON.stringify(roleResearch), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<RoleResearchI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}
}
