import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { TrainingTeacherI } from 'src/app/models/institution/training';
import { TeacherI } from 'src/app/models/user/teacher';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  API_URI = environment.API_URI;

  // API path
 base_path_post = `${this.API_URI}/api/Teacher`;
 base_path_get = `${this.API_URI}/api/Teacher`;

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
 createItem(teacher: TeacherI): Observable<TeacherI> {
   return this.http.post<TeacherI>(this.base_path_post, teacher).pipe(
     tap((res: TeacherI) => {
       if (res) {
         // Crear usuario
         // console.log('registro insertado');
       }
     }),
     catchError(this.handleError))
 }
 FormacionDocente(UserId: string,TrainingTeacherId:string,name:string,file:any): Observable<any> {
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
  const form= new FormData();//Crea un formulario
  form.append('name',name);
  form.append('UserId',UserId);
  form.append('TrainingTeacherId',TrainingTeacherId);
  form.append('file',file);//Asigna el campo File
console.log(form,'FormData')
let body={
  UserId: UserId,TrainingTeacherId:TrainingTeacherId,name:name,file:file
}
  // return this.http.post<any>(this.API_URI + '/api/file/FormacionDocente',form).pipe(
    return this.http.post<any>(this.API_URI + '/api/subir',form).pipe(
    tap((res: any) => {
      if (res) {
        // Crear usuario
        // console.log('registro insertado');
      }
    }),
    catchError(this.handleError))
}
// addPicture(name:string,file:File):Observable<Object>{
//   const form= new FormData();//Crea un formulario
//   form.append('name',name);
//   form.append('file',file,'form-data');//Asigna el campo File
//   return this.http.post<Object>(this.api,form).
//   pipe(
//       catchError(this.handleError)
//   );
// }
 

 AsignarTeacher(teacher: any): Observable<any> {
  return this.http.post<any>(this.API_URI+'/api/AsignarTeacher', teacher).pipe(
    tap((res: TeacherI) => {
      if (res) {
        // Crear usuario
        // console.log('registro insertado');
      }
    }),
    catchError(this.handleError))
}

 // Get single student data by ID
 getItem(id: number): Observable<{teacher:TeacherI}> {
   return this.http
     .get<{teacher:TeacherI}>(this.base_path_get + '/' + id)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
 getItemHeadquarterProgram(id: number): Observable<{teachers:any[],lines:any[],semilleros:any[]}> {
  return this.http
    .get<{teachers:any[],lines:any[],semilleros:any[]}>(this.base_path_get + '/HeadquarterProgram/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}


AddTeacherSemilleros(id:number): Observable<{ teachers: any[] }> {
  return this.http
    .get<{ teachers: any[] }>(this.API_URI+'/api/AddTeacherSemilleros/'+id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
OneAddTeacherSemilleros(id: number): Observable<{ teachers: any[] }> {
  return this.http
    .get<{ teachers: any[] }>(this.API_URI+'/api/OneAddTeacherSemilleros/'+id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

 // Get students data

 getList(): Observable<{ teachers: TeacherI[] }> {
   return this.http
     .get<{ teachers: TeacherI[] }>(this.base_path_get)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Update item by id
 updateItem(id:number, teacher:any): Observable<any> {
   return this.http
     .patch<any>(this.base_path_get + '/' + id, JSON.stringify(teacher), this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }

 // Delete item by id
 deleteItem(id:number) {
   return this.http
     .delete<TeacherI>(this.base_path_get + '/' + id, this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
}
