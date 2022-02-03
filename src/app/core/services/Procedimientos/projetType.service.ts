import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ProjetI } from 'src/app/models/projet/projet';
import { ProjetTypeI } from 'src/app/models/projet/projet_type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjetTypeService {


  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/ProjetType`;
  base_path_get = `${this.API_URI}/api/ProjetType`;

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
createItem(ProjetType: ProjetTypeI): Observable<ProjetTypeI> {
  return this.http
    .post<ProjetTypeI>(this.base_path_post, JSON.stringify(ProjetType), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getItem(id: number): Observable<{ProjetType:ProjetTypeI}> {
  return this.http
    .get<{ProjetType:ProjetTypeI}>(this.base_path_get + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get students data
getList(): Observable<{ projetTypes: ProjetTypeI[] }> {
 return this.http
   .get<{ projetTypes: ProjetTypeI[] }>(this.base_path_get)
   .pipe(
     retry(2),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, ProjetType:ProjetTypeI): Observable<ProjetTypeI> {
  return this.http
    .patch<ProjetTypeI>(this.base_path_get + '/' + id, JSON.stringify(ProjetType), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<ProjetTypeI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
}
