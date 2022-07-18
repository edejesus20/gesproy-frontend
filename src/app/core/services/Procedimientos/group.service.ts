import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { GroupI } from 'src/app/models/institution/group';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  API_URI = environment.API_URI;

  // API path
  base_path_post = `${this.API_URI}/api/Group`;
  base_path_get = `${this.API_URI}/api/Group`;

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
createItem(group: GroupI): Observable<{group:GroupI}> {
  return this.http.post<{group:GroupI}>(this.base_path_post, JSON.stringify(group), this.httpOptions)
    .pipe(
      tap((res: {group:GroupI}) => {
        if (res) {
          console.log(res)
        }
      }),
      retry(0),
      catchError(this.handleError)
    )
}
getAreasLineasGrupos(GroupId: number,LineId: number): Observable<{groupLine:any[]}> {
  return this.http.post<{groupLine:any[]}>(this.API_URI + '/api/AreasLineasGrupos', 
  JSON.stringify({GroupId:GroupId,LineId:LineId}), this.httpOptions)
    .pipe(
      tap((res: {groupLine:any[]}) => {
        if (res) {
          console.log(res)
        }
      }),
      retry(0),
      catchError(this.handleError)
    )
}


Anexos(GroupId: string,AnexoId:string,GroupAnexoId:string,file:any): Observable<any> {
  let token : string | null=localStorage.getItem('token')
  let user : string | null=localStorage.getItem('user')
  // let httpOptions:any
  // if(token != null && user != null) {
  //   let userObjeto:any = JSON.parse(user); 
  //   httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'x-token':token,
  //       'user':userObjeto.id
  //     })
  //   }
  // }
  let form= new FormData();//Crea un formulario
  form.append('GroupId',GroupId);
  form.append('AnexoId',AnexoId);
  form.append('GroupAnexoId',GroupAnexoId);
  form.append('file',file);//Asigna el campo File
  console.log(file,'FormData')
  // return this.http.post<any>(this.API_URI + '/api/file/FormacionDocente',form).pipe(
    return this.http.post<any>(this.API_URI + '/api/subirAnexoGrupos',form).pipe(
    tap((res: any) => {
      if (res) {
      }
    }),
    catchError(this.handleError))
}

Anexo(GroupId: string,url:string,file:any): Observable<any> {
  let form= new FormData();//Crea un formulario
  form.append('GroupId',GroupId);
  form.append('url',url);
  form.append('file',file);//Asigna el campo File
  console.log(file,'FormData')
  // return this.http.post<any>(this.API_URI + '/api/file/FormacionDocente',form).pipe(
    return this.http.post<any>(this.API_URI + '/api/subirAnexoGrupo',form).pipe(
    tap((res: any) => {
      if (res) {
      }
    }),
    catchError(this.handleError))
}


// Get single student data by ID
getItem(id: number): Observable<{group:GroupI}> {
  return this.http
    .get<{group:GroupI}>(this.base_path_get + '/' + id)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}
getItemHeadquarterProgram(id: number): Observable<{groups:GroupI[]}> {
  return this.http
    .get<{groups:GroupI[]}>(this.base_path_get + '/HeadquarterProgram/' + id)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}
getItemOneHeadquarterProgram(id: number): Observable<{group:GroupI}> {
  return this.http
    .get<{group:GroupI}>(this.base_path_get + '/OneHeadquarterProgram/' + id)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}


// Get students data
getList(): Observable<{ groups: GroupI[] }> {
 return this.http
   .get<{ groups: GroupI[] }>(this.base_path_get)
   .pipe(
     retry(0),
     catchError(this.handleError)
   )
}

// Update item by id
updateItem(id:number, group:GroupI): Observable<{group:GroupI}> {
  return this.http
    .patch<{group:GroupI}>(this.base_path_get + '/' + id, JSON.stringify(group), this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}

// Delete item by id
deleteItem(id:number) {
  return this.http
    .delete<GroupI>(this.base_path_get + '/' + id, this.httpOptions)
    .pipe(
      retry(0),
      catchError(this.handleError)
    )
}
}
