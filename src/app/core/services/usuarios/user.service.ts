import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { CambiarPasswordI } from 'src/app/models/authorization/usr_CambiarPassword';
import { UserI } from 'src/app/models/authorization/usr_User';
import { environment } from 'src/environments/environment';
import { PersonI } from 'src/app/models/user/person';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URI = environment.API_URI;

  // API path
  base_path = `${this.API_URI}/api/user`;
  base_path_post = `${this.API_URI}/api/user`;
  base= `${this.API_URI}/api/change-password`;
  constructor(private http: HttpClient,
    ) {  
  }

  // Http Options
  


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
// Get students data
getUser(): Observable<{users: PersonI[]}> {
  let token : string | null=localStorage.getItem('token')
  if(token != null) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token':token
      })
    }
    // console.log(httpOptions)
    return this.http
      .get<{users: PersonI[]}>(this.base_path,httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }else{
    return this.http
    .get<{users: PersonI[]}>(this.base_path)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}


getUserIdentificacion(cc:string): Observable<{ user: UserI }> {
  return this.http
    .get<{ user: UserI }>(this.base_path+ '/cc/' + cc)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

// Get single student data by ID
getOneUser(id: number): Observable<{ user: PersonI }> {
  return this.http
    .get<{ user: PersonI }>(this.base_path + '/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}



// createUser(person: any): Observable<{ person: any }> {
//   return this.http
//     .post<{ person: any }>(this.base_path, JSON.stringify(person))
//     .pipe(
//       retry(2),
//       catchError(this.handleError)
//     )
// }

createUser(person: any): Observable<any> {
  return this.http.post<any>(this.base_path_post, person).pipe(
    tap((res: PersonI) => {
      if (res) {
        // Crear usuario
        // console.log('registro insertado');
      }
    }),
    catchError(this.handleError))
}


actualzarContraseña(user: CambiarPasswordI): Observable<{ user: CambiarPasswordI }> {
  let token : string | null=localStorage.getItem('token')
  let userT :string | null= localStorage.getItem('user');
  if(token != null && userT != null) {
    let userObjeto:any = JSON.parse(userT); 
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-token':token,
        'user':userObjeto
      })
    }
    return this.http
    .put<{ user: CambiarPasswordI }>(this.base, JSON.stringify(user),httpOptions)
    .pipe(retry(2),catchError(this.handleError))
  }else{
      return this.http
      .put<{ user: CambiarPasswordI }>(this.base, JSON.stringify(user))
      .pipe(retry(2),catchError(this.handleError)) 
    }
}

updateUser(user:any){
  let token : string | null=localStorage.getItem('token')
  let userT :string | null= localStorage.getItem('user');
  if(token != null && userT != null) {
    let userObjeto:any = JSON.parse(userT); 
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-token':token,
        'user':userObjeto
      })
    }
    console.log('aqui')
    return this.http.patch(`${this.base_path}/${user.id}`, user,httpOptions)
    .pipe(retry(2),catchError(this.handleError))
  }else{
    return this.http.patch(`${this.base_path}/${user.id}`, user)
      .pipe(retry(2),catchError(this.handleError)) 
    }

  // return this.http.patch(`${this.base_path}/${user.id}`, user).pipe(
  //   retry(2),
  //   catchError(this.handleError)
  // )

}
eliminarUser(id:number){
  return this.http.delete(`${this.base_path}/${id}`).pipe(
    retry(2),
    catchError(this.handleError)
  )
}

createImagen(formData:any){

    return this.http.post('http://localhost:4000/api/subir',JSON.stringify(formData))
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

// }


}
