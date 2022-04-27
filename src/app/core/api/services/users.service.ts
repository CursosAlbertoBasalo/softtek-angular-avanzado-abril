import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@stk/models/user.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  getAll$(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  getByEmail$(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/?email=${email}`);
  }
}
