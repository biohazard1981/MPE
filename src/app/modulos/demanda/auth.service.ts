import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
export class AuthService {

  isLoggedIn: boolean = false;

  private apiUrl = 'http://localhost:8080/api/'; 

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login/consultar`, { username, password }, httpOptions)
      .pipe(
        tap(response => {
          this.isLoggedIn = true;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  isAuthenticated():boolean{
    return this.isLoggedIn;
}

}