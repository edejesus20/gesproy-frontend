import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DocumentTypeI } from 'src/app/models/user/document_types';
import { TeacherI } from 'src/app/models/user/teacher';
import { AdministrativeI } from 'src/app/models/user/administrative';
import { StudentI } from 'src/app/models/user/student';
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  API_URI = environment.API_URI;

  // API path
 base_path_docente = `${this.API_URI}/api/Teacher/Perfil`;
 base_path_estudiante = `${this.API_URI}/api/Student/Perfil`;
 base_path_administrativo = `${this.API_URI}/api/Administrative/Perfil`;
 base_path_perfil = `${this.API_URI}/api/user/Perfil`;

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

 // Update item by id
 updateDocente(id:number, deleteTeacher:TeacherI): Observable<{teacher:TeacherI}> {
   return this.http
     .patch<{teacher:TeacherI}>(this.base_path_docente + '/' + id, JSON.stringify(deleteTeacher), this.httpOptions)
     .pipe(
       retry(2),
       catchError(this.handleError)
     )
 }
 getItemTeacher(id: number): Observable<{teacher:TeacherI}> {
  return this.http
    .get<{teacher:TeacherI}>(`${this.API_URI}/api/Teacher/User/`+ id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
 

 updateEstudiante(id:number, documentType:any): Observable<any> {
  return this.http
    .patch<any>(this.base_path_estudiante + '/' + id, JSON.stringify(documentType), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// student
getItemStudent(id: number): Observable<{student:StudentI}> {
  return this.http
    .get<{student:StudentI}>(`${this.API_URI}/api/Student/User/`+ id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
updateAdminsitrativo(id:number, documentType:any): Observable<any> {
  return this.http
    .patch<any>(this.base_path_administrativo + '/' + id, JSON.stringify(documentType), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
getItemAdministrative(id: number): Observable<{administrative:AdministrativeI}> {
  return this.http
    .get<{administrative:AdministrativeI}>(`${this.API_URI}/api/Administrative/User/`+ id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}
updatePerfil(id:number, dataUser:any): Observable<any> {
  return this.http
    .patch<any>(this.base_path_perfil + '/' + id, JSON.stringify(dataUser), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}



}
