import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError ,tap} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SeedbedI } from 'src/app/models/institution/seedbed';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeedbedService {
  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/Seedbed`;
  base_path_get = `${this.API_URI}/api/Seedbed`;

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
createItem(seedbeds: SeedbedI): Observable<{seedbed: SeedbedI}> {
  return this.http
    .post<{seedbed: SeedbedI}>(this.base_path_post, JSON.stringify(seedbeds), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}
Anexo(SeedbedId: string,url:string,file:any): Observable<any> {
  let form= new FormData();//Crea un formulario
  form.append('SeedbedId',SeedbedId);
  form.append('url',url);
  form.append('file',file);//Asigna el campo File
  console.log(file,'FormData')
  // return this.http.post<any>(this.API_URI + '/api/file/FormacionDocente',form).pipe(
    return this.http.post<any>(this.API_URI + '/api/subirAnexoSeedbed',form).pipe(
    tap((res: any) => {
      if (res) {
      }
    }),
    catchError(this.handleError))
}
// Get single student data by ID
getItem(id: number): Observable<{seedbed:SeedbedI}> {
  return this.http
    .get<{seedbed:SeedbedI}>(this.base_path_get + '/' + id)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Get students data
getList(): Observable<{ seedbeds: SeedbedI[] }> {
 return this.http
   .get<{ seedbeds: SeedbedI[] }>(this.base_path_get)
   .pipe(
     retry(0),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, item:SeedbedI): Observable<SeedbedI> {
  return this.http
    .patch<SeedbedI>(this.base_path_get + '/' + id, JSON.stringify(item), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<SeedbedI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}
}
