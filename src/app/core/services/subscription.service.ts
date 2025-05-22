import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../../Types';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private readonly baseUrl = 'http://localhost:8080/stripe';

  constructor(private http: HttpClient) {}

  getAllSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.baseUrl);
  }

  createCheckoutSession(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post<any>(`${this.baseUrl}/subscribe`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  assignSubscription(email: string, productId: string): Observable<string> {
    const token = localStorage.getItem('token');
    return this.http.patch<string>(
      `${this.baseUrl}/assign-subscription/${email}/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'text' as 'json',
      }
    );
  }
}
