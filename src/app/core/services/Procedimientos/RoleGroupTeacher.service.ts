import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RoleGroupTeacherI } from 'src/app/models/institution/group';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleGroupTeacherService {

  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/RoleGroupTeacher`;
  base_path_get = `${this.API_URI}/api/RoleGroupTeacher`;

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
createItem(roleGroupTeacher: RoleGroupTeacherI): Observable<RoleGroupTeacherI> {
  return this.http
    .post<RoleGroupTeacherI>(this.base_path_post, JSON.stringify(roleGroupTeacher), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getItem(id: number): Observable<{roleGroupTeacher:RoleGroupTeacherI}> {
  return this.http
    .get<{roleGroupTeacher:RoleGroupTeacherI}>(this.base_path_get + '/' + id)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Get students data
getList(): Observable<{ roleGroupTeachers: RoleGroupTeacherI[] }> {
 return this.http
   .get<{ roleGroupTeachers: RoleGroupTeacherI[] }>(this.base_path_get)
   .pipe(
     retry(0),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, roleGroupTeacher:RoleGroupTeacherI): Observable<RoleGroupTeacherI> {
  return this.http
    .patch<RoleGroupTeacherI>(this.base_path_get + '/' + id, JSON.stringify(roleGroupTeacher), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<RoleGroupTeacherI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}
}
