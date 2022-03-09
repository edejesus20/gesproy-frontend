import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { ProductivityStepI } from 'src/app/models/productivity/productivity_step';
@Injectable({
  providedIn: 'root'
})
export class Productivity_stepService {
  API_URI = environment.API_URI;
  base_path_post = `${this.API_URI}/api/ProductivityStep`;
  base_path_get = `${this.API_URI}/api/ProductivityStep`;
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

createItem(productivityStep: ProductivityStepI): Observable<ProductivityStepI> {
  return this.http.post<ProductivityStepI>(this.base_path_post, productivityStep).pipe(tap(
    (res: ProductivityStepI) => {
      if (res) {
      }
    })
  );
}

 getItem(id: number): Observable<{productivityStep:ProductivityStepI}> {
   return this.http
     .get<{productivityStep:ProductivityStepI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
 getList(): Observable<{ productivitySteps: ProductivityStepI[] }> {
   return this.http
     .get<{ productivitySteps: ProductivityStepI[] }>(this.base_path_get)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 updateItem(id:number, productivityStep:ProductivityStepI): Observable<ProductivityStepI> {
   return this.http
     .patch<ProductivityStepI>(this.base_path_get + '/' + id, JSON.stringify(productivityStep), this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 deleteItem(id:number) {
   return this.http
     .delete<ProductivityStepI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
}
