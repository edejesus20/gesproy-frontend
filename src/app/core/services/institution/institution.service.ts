import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { InstitutionDetailI, InstitutionI } from 'src/app/models/desk/institution';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  API_URI = environment.API_URI;

  // API path
  base_path = `${this.API_URI}/api/institution`;
  //base= `${this.API_URI}/api/change-password`;

  constructor(private http: HttpClient) { }

  // Http Options
 httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

// Handle API errors
handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};

//Institution
getInstitution(): Observable<{institutions: InstitutionI[]}> {
  let token : string | null=localStorage.getItem('token')
  if(token != null) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token':token
      })
    }
    return this.http.get<{institutions: InstitutionI[]}>(this.base_path,httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }else{
    return this.http.get<{institutions: InstitutionI[]}>(this.base_path)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

}
// InstitutionDetail
getInstitutionDetail(): Observable<{details: InstitutionDetailI[]}> {
  return this.http
    .get<{details: InstitutionDetailI[]}>(`${this.API_URI}/api/detail`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
}

updateInstitution(institutions:InstitutionI){
  return this.http.patch(`${this.base_path}/${institutions.id}`, institutions).pipe(
    retry(2),
    catchError(this.handleError)
  )

}
eliminarInstitution(id:number){
  return this.http.delete(`${this.base_path}/${id}`).pipe(
    retry(2),
    catchError(this.handleError)
  )
}
//-------------------------------------------------------------general
//aspectos generales
getGeneralFeature(): Observable<{ generalFeature: InstitutionDetailI }>{
  return this.http.get<{ generalFeature: InstitutionDetailI }>(`${this.base_path}generalFeature`)
  .pipe(
    retry(2),
    catchError(this.handleError)
  )
}
//mision
getMission(): Observable<{ mission: InstitutionDetailI }>{
  return this.http.get<{ mission: InstitutionDetailI }>(`${this.base_path}mission`)
  .pipe(
    retry(2),
    catchError(this.handleError)
  )
}
//vision
getVision(): Observable<{vision: InstitutionDetailI}>{
  return this.http.get<{vision: InstitutionDetailI}>(`${this.base_path}vision`)
  .pipe(
    retry(2),
    catchError(this.handleError)
  )
}
//valores
getValues(): Observable<{values:InstitutionDetailI}>{
  return this.http.get<{values:InstitutionDetailI}>(`${this.base_path}value`)
  .pipe(
    retry(2),
    catchError(this.handleError)
  )
}
//testimonio
getTestimonials(): Observable<{testimonials:InstitutionDetailI}>{
  return this.http.get<{testimonials:InstitutionDetailI}>(`${this.base_path}testimonial`)
  .pipe(
    retry(2),
    catchError(this.handleError)
  )
}
//eventos
getEvents(): Observable<{events:InstitutionDetailI}>{
  return this.http.get<{events:InstitutionDetailI}>(`${this.base_path}event`)
  .pipe(
    retry(2),
    catchError(this.handleError)
  )
}
//-------------------------------------------------------------detalles
//acerca de nosotros
getAboutUs(): Observable<{aboutUs:InstitutionDetailI}>{
  return this.http.get<{aboutUs:InstitutionDetailI}>(`${this.base_path}aboutUs`)
  .pipe(
    retry(2),
    catchError(this.handleError)
  )
}
//lineas de prestamo
getLoanLines(): Observable<{loanLines:InstitutionDetailI}>{
  return this.http.get<{loanLines:InstitutionDetailI}>(`${this.base_path}linesPrestamo`)
  .pipe(
    retry(2),
    catchError(this.handleError)
  )
}
//organigrama
getOrganizationChart(): Observable<{organizationChart:InstitutionDetailI}>{
  return this.http.get<{organizationChart:InstitutionDetailI}>(`${this.base_path}organigrama`)
  .pipe(
    retry(2),
    catchError(this.handleError)
  )
}
//-----------------------------------------------------------------------contactos
}
