import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/auth-interfaces';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  constructor(private httpClient: HttpClient) { }

  register = (name: string, email: string, password: string) => {
    const url = `${this.baseUrl}/auth/new`;
    const body = { name, email, password };

    return this.httpClient.post<AuthResponse>(url, body)
      .pipe(
        tap(({ ok, token }) => {
          if (ok) {
            localStorage.setItem('token', token!);
          }
        }),
        map(res => res.ok),
        catchError(err => of(err.error.msg))
      );
  }

  login = (email: string, password: string) => {
    const url = `${this.baseUrl}/auth`;
    const body = { email, password };

    return this.httpClient.post<AuthResponse>(url, body)
      .pipe(
        tap(res => {
          if (res.ok) {
            localStorage.setItem('token', res.token!);
          }
        }),
        map(res => res.ok),
        catchError(err => of(err.error.msg))
      );
  }

  validateJWT = (): Observable<boolean> => {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

    return this.httpClient.get<AuthResponse>(url, { headers }).pipe(
      map(res => {
        localStorage.setItem('token', res.token!)
        this._user = {
          name: res.name!,
          uid: res.uid!,
          email: res.email!
        }
        return res.ok;
      }),
      catchError(err => of(false))
    );
  }

  logout = () => {
    localStorage.clear();
  }
}