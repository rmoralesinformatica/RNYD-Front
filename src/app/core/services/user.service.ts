import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  getUserDetails(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${email}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${user.email}`, user);
  }

  deleteUser(email: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${email}`);
  }

  assignDiet(email: string, dietId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${email}/assign-diet`, {
      dietId,
    });
  }

  assignWorkout(email: string, workoutId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${email}/assign-workout`, {
      workoutId,
    });
  }
}
