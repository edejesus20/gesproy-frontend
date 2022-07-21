import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TypeMemberI } from 'src/app/models/projet/projet';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TypeMemberService {

  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/TypeMember`;
  base_path_get = `${this.API_URI}/api/TypeMember`;

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
createItem(typeMember: TypeMemberI): Observable<TypeMemberI> {
  return this.http
    .post<TypeMemberI>(this.base_path_post, JSON.stringify(typeMember), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getItem(id: number): Observable<{typeMember:TypeMemberI}> {
  return this.http
    .get<{typeMember:TypeMemberI}>(this.base_path_get + '/' + id)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Get students data
getList(): Observable<{ typeMembers: TypeMemberI[] }> {
 return this.http
   .get<{ typeMembers: TypeMemberI[] }>(this.base_path_get)
   .pipe(
     retry(0),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, typeMember:TypeMemberI): Observable<TypeMemberI> {
  return this.http
    .patch<TypeMemberI>(this.base_path_get + '/' + id, JSON.stringify(typeMember), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<TypeMemberI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}
}
