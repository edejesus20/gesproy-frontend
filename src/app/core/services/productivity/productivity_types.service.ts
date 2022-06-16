import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { ProductivityTypeI } from 'src/app/models/productivity/productivity_types';

@Injectable({
  providedIn: 'root'
})
export class Productivity_typesService {

  API_URI = environment.API_URI;
  base_path_post = `${this.API_URI}/api/ProductivityType`;
  base_path_get = `${this.API_URI}/api/ProductivityType`;
 constructor(private http: HttpClient) { }
 httpOptions = {
   headers: new HttpHeaders({
     'Content-Type': 'application/json'
   })
 }

 handleError(res: Response) {
  const statusCode = res.status;
  const body = res;
  const error = {
    statusCode: statusCode,
    error: body
  };
  return throwError(error.error);
};

createItem(productivityType: ProductivityTypeI): Observable<ProductivityTypeI> {
  return this.http.post<ProductivityTypeI>(this.base_path_post, productivityType).pipe(tap(
    (res: ProductivityTypeI) => {
      if (res) {
      }
    })
  );
}

 getItem(id: number): Observable<{productivityType:ProductivityTypeI}> {
   return this.http
     .get<{productivityType:ProductivityTypeI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }
 getList(): Observable<{ productivityTypes: ProductivityTypeI[] }> {
   return this.http
     .get<{ productivityTypes: ProductivityTypeI[] }>(this.base_path_get)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 updateItem(id:number, productivityType:ProductivityTypeI): Observable<ProductivityTypeI> {
   return this.http
     .patch<ProductivityTypeI>(this.base_path_get + '/' + id, JSON.stringify(productivityType), this.httpOptions)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 deleteItem(id:number) {
   return this.http
     .delete<ProductivityTypeI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }
}
