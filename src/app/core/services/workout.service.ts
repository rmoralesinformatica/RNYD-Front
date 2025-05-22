import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from '../../Types';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  private apiUrl = 'http://localhost:8080/workout';

  constructor(private http: HttpClient) {}

  getAll(email?: string): Observable<Workout[]> {
    const token = localStorage.getItem('token');
    let params = new HttpParams();
    if (email) {
      params = params.set('email', email);
    }

    return this.http.get<Workout[]>(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`, // send token directly, no 'Bearer '
        'Content-Type': 'application/json',
      },
      params: params,
    });
  }

  create(workout: FormData): Observable<any> {
    console.log('workout', workout);

    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/create`, workout, {
      headers: {
        Authorization: `Bearer ${token}`, // send token directly, no 'Bearer '
      },
      responseType: 'text' as 'json',
    });
  }

  update(workout: FormData, id: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.patch(`${this.apiUrl}/update/${id}`, workout, {
      headers: {
        Authorization: `Bearer ${token}`, // send token directly, no 'Bearer '
      },
      responseType: 'text' as 'json',
    });
  }

  delete(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // send token directly, no 'Bearer '
      },
      responseType: 'text' as 'json',
    });
  }

  assignWorkout(email: string, workout: number): Observable<any> {
      const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/assign/${email}`, {
      workout_id: workout,
    },
      {
        headers: {
          Authorization: `Bearer ${token}`, // send token directly, no 'Bearer '
          'Content-Type': 'application/json',
        },
        responseType: 'text' as 'json',
      });
  }
}
