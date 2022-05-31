import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotificationI, RecipientI } from 'src/app/models/desk/notifications';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/Notification`;
  base_path_get = `${this.API_URI}/api/Notification`;

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
createItem(notification: NotificationI): Observable<NotificationI> {
  return this.http
    .post<NotificationI>(this.base_path_post, JSON.stringify(notification), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getItem(id: number): Observable<{notification:NotificationI}> {
  return this.http
    .get<{notification:NotificationI}>(this.base_path_get + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get students data
getList(): Observable<{ notifications: NotificationI[] }> {
 return this.http
   .get<{ notifications: NotificationI[] }>(this.base_path_get)
   .pipe(
     retry(2),
     catchError(this.handleError)
   )
}

getUserNotification(id: number): Observable<{recipients:RecipientI[]}> {
  return this.http
    .get<{recipients:RecipientI[]}>(this.base_path_get + '/User/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Update item by id
updateItem(id:number, item:NotificationI): Observable<{notification:NotificationI}> {
  return this.http
    .patch<{notification:NotificationI}>(this.base_path_get + '/' + id, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
marcar(id:number, item:any): Observable<{notification:NotificationI}> {
  return this.http
    .patch<{notification:NotificationI}>(this.base_path_get + '/Marcar/' + id, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<NotificationI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
}
