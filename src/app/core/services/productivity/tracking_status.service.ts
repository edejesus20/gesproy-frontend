import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { TrackingStatusI } from 'src/app/models/productivity/tracking_status';
@Injectable({
  providedIn: 'root'
})
export class Tracking_statusService {


  API_URI = environment.API_URI;
  base_path_post = `${this.API_URI}/api/TrackingStatus`;
  base_path_get = `${this.API_URI}/api/TrackingStatus`;
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

createItem(trackingStatus: TrackingStatusI): Observable<TrackingStatusI> {
  return this.http.post<TrackingStatusI>(this.base_path_post, trackingStatus).pipe(tap(
    (res: TrackingStatusI) => {
      if (res) {
      }
    })
  );
}

 getItem(id: number): Observable<{trackingStatus:TrackingStatusI}> {
   return this.http
     .get<{trackingStatus:TrackingStatusI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
 getList(): Observable<{ trackingStatuss: TrackingStatusI[] }> {
   return this.http
     .get<{ trackingStatuss: TrackingStatusI[] }>(this.base_path_get)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 updateItem(id:number, trackingStatus:TrackingStatusI): Observable<TrackingStatusI> {
   return this.http
     .patch<TrackingStatusI>(this.base_path_get + '/' + id, JSON.stringify(trackingStatus), this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 deleteItem(id:number) {
   return this.http
     .delete<TrackingStatusI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
}
