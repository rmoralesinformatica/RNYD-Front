import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserDTO } from "../../Types";

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserDTO[]> {
    const token = localStorage.getItem('token');
    return this.http.get<UserDTO[]>(`${this.apiUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }
}
