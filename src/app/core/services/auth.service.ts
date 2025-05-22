import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UserDTO } from '../../Types';

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

  register(user: UserDTO): Observable<string> {
    console.log(user);

    return this.http.post<string>(`${this.apiUrl}/signup/register`, user, {
      responseType: 'text' as 'json',
      headers: { 'Content-Type': 'application/json' },
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getAdminEmail(): string | null {
    console.log(localStorage.getItem('email'));

    return localStorage.getItem('email');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  /*****************Admind check  ************************************/
  checkIfAdmin(email: string): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.http.get<boolean>(`${this.apiUrl}/user/check-admin/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`, // send token directly, no 'Bearer '
        'Content-Type': 'application/json',
      },
    });
  }

  setAdminStatus(status: boolean): void {
    this.isAdminUser = status;
  }

  getAdminStatus(): boolean {
    return this.isAdminUser;
  }

    /***************** Subscription check  *****************************/
  isSubscribed(email: string): Observable<boolean> {
    const token = localStorage.getItem('token');
    
    // Return true if the user is already identified as admin
    if (this.isAdminUser) {
      return of(true);
    }

    return this.http.get<any>(`${this.apiUrl}/user/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).pipe(
      map((user) => {
        // Check if the user has a subscription
        return user.role === 'ADMIN' || user.subscription_product_id !== null;
      }),
      catchError((error) => {
        console.error('Error checking subscription:', error);
        return of(false);
      })
    );
  }
}
