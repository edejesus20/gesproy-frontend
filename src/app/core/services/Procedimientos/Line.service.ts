import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry,tap } from 'rxjs/operators';
import { LineI } from 'src/app/models/projet/line';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LineService {


  API_URI = environment.API_URI;
  base_path_post = `${this.API_URI}/api/line`;
  base_path_get = `${this.API_URI}/api/line`;

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
createItem(line: LineI): Observable<{line:LineI}> {
  return this.http
    .post<{line:LineI}>(this.base_path_post, JSON.stringify(line), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}


Anexo(LineId: string,url:string,file:any): Observable<any> {
  let form= new FormData();//Crea un formulario
  form.append('LineId',LineId);
  form.append('url',url);
  form.append('file',file);//Asigna el campo File
  console.log(file,'FormData')
  // return this.http.post<any>(this.API_URI + '/api/file/FormacionDocente',form).pipe(
    return this.http.post<any>(this.API_URI + '/api/subirAnexoLinea',form).pipe(
    tap((res: any) => {
      if (res) {
      }
    }),
    catchError(this.handleError))
}
// G
// Get single student data by ID
getItem(id: number): Observable<{line:LineI}> {
  return this.http
    .get<{line:LineI}>(this.base_path_get + '/' + id)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

getOnelineThematic(id: number): Observable<{thematic_axis:any[]}> {
  return this.http
    .get<{thematic_axis:any[]}>(this.API_URI + '/api/lineThematic/' + id)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

AddTeacherLines(id: number): Observable<{ lines: any[],lines2 : any[]}> {
  return this.http
    .get<{ lines: any[],lines2 : any[] }>(this.API_URI+'/api/AddTeacherLines' + '/' + id)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
 }

// Get students data
getList(): Observable<{ lines: LineI[] }> {
 return this.http
   .get<{ lines: LineI[] }>(this.base_path_get)
   .pipe(
     retry(0),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, line:LineI): Observable<{line:LineI}> {
  return this.http
    .patch<{line:LineI}>(this.base_path_get + '/' + id, JSON.stringify(line), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<LineI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}
}
