import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScheduledAction } from '../../shared/models/scheduled-action.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScheduledActionService {
  private baseUrl = 'https://localhost:7280/api/scheduledactions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ScheduledAction[]> {
    return this.http.get<ScheduledAction[]>(this.baseUrl);
  }

  create(action: ScheduledAction): Observable<ScheduledAction> {
    return this.http.post<ScheduledAction>(this.baseUrl, action);
  }

  update(id: string, action: ScheduledAction): Observable<ScheduledAction> {
    return this.http.put<ScheduledAction>(`${this.baseUrl}/${id}`, action);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
