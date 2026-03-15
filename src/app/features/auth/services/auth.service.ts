import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../../shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private USER_LOGIN: string = environment.server_url + '/auth/login';

  constructor(private http: HttpClient) { }

  loginUser(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.USER_LOGIN, payload).pipe(
      tap((res) => {
        if (res?.accessToken) {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
