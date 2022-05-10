import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Agency } from '../models/agency.interface';

@Injectable({
  providedIn: 'root',
})
export class AgenciesService {
  private readonly apiUrl = environment.apiUrl + '/agencies';

  constructor(private http: HttpClient) {}

  getAll$(): Observable<Agency[]> {
    return this.http.get<Agency[]>(this.apiUrl);
  }
  getError$(): Observable<Agency[]> {
    return this.http.get<Agency[]>(this.apiUrl + '/error');
  }

  getById$(id: string): Observable<Agency> {
    return this.http.get<Agency>(this.apiUrl + '/' + id);
  }
}
