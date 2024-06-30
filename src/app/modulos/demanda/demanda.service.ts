import { HttpHeaders,HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Basic cm9iZXJ0bzpNUEVyb2JlcnRv'
  }),
  withCredentials: true
};


@Injectable({
  providedIn: 'root'
})
export class DemandaService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  guardarDemanda(demanda: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}demandas/guardar`, demanda, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  guardarParteProcesal(parteProcesal: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}parte-procesal/guardar`, parteProcesal, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  guardarArancel(arancel: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}arancel/guardar`, arancel, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  guardarDocumentoAdjunto(documentoAdjunto: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}documento-adjunto/guardar`, documentoAdjunto, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrió un error:', error.error.message);
    } else {
      console.error(`Código de error del servidor: ${error.status}, ` +
                    `mensaje: ${error.message}`);
    }
    return throwError('Error en la solicitud. Por favor, intenta nuevamente.');
  }
}

