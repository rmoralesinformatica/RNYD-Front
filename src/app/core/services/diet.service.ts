import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diet } from '../../Types';

@Injectable({ providedIn: 'root' })
export class DietService {
  private apiUrl = 'http://localhost:8080/diet';

  constructor(private http: HttpClient) {}

  getAll(email?: string): Observable<Diet[]> {
    const token = localStorage.getItem('token');

    let params = new HttpParams();
    if (email) {
      params = params.set('email', email);
    }

    return this.http.get<Diet[]>(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: params,
    });
  }

  create(data: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // send token directly, no 'Bearer '
      },
      responseType: 'text' as 'json',
    });
  }

  update(data: FormData, id: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.patch(`${this.apiUrl}/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // send token directly, no 'Bearer '
      },
      responseType: 'text' as 'json',
    });
  }

  delete(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // send token directly, no 'Bearer '
        'Content-Type': 'application/json',
      },
      responseType: 'text' as 'json',
    });
  }

  assignDiet(email: string, diet: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(
      `${this.apiUrl}/assign/${email}`,
      { diet_id: diet },
      {
        headers: {
          Authorization: `Bearer ${token}`, // send token directly, no 'Bearer '
          'Content-Type': 'application/json',
        },
        responseType: 'text' as 'json',
      }
    );
  }
}
