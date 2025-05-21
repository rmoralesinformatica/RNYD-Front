import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private isAdminUser: boolean = false;

  constructor(private http: HttpClient) {}

  login(email: string, keyword: string): Observable<string> {
    console.log(email, keyword);

    return this.http.post<string>(
      `${this.apiUrl}/auth/signin`,
      {
        email,
        keyword,
      },
      {
        responseType: 'text' as 'json',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
