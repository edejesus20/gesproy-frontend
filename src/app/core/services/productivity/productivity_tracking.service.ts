import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { ProductivityTrackingI } from 'src/app/models/productivity/productivity_tracking';
@Injectable({
  providedIn: 'root'
})
export class Productivity_trackingService {

  API_URI = environment.API_URI;
  base_path_post = `${this.API_URI}/api/ProductivityTracking`;
  base_path_get = `${this.API_URI}/api/ProductivityTracking`;
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

createItem(productivityTracking: ProductivityTrackingI): Observable<ProductivityTrackingI> {
  return this.http.post<ProductivityTrackingI>(this.base_path_post, productivityTracking).pipe(tap(
    (res: ProductivityTrackingI) => {
      if (res) {
      }
    })
  );
}

 getItem(id: number): Observable<{productivityTracking:ProductivityTrackingI}> {
   return this.http
     .get<{productivityTracking:ProductivityTrackingI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }
 getList(): Observable<{ productivityTrackings: ProductivityTrackingI[] }> {
   return this.http
     .get<{ productivityTrackings: ProductivityTrackingI[] }>(this.base_path_get)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 updateItem(id:number, productivityTracking:ProductivityTrackingI): Observable<ProductivityTrackingI> {
   return this.http
     .patch<ProductivityTrackingI>(this.base_path_get + '/' + id, JSON.stringify(productivityTracking), this.httpOptions)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }

 deleteItem(id:number) {
   return this.http
     .delete<ProductivityTrackingI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(0),
       catchError(this.handleError)
     )
 }
}
