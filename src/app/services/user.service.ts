import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getAllUsers(): Observable<any> {
    return this.apiService.get<any>('Users/all');
  }

  deleteUser(userId: string): Observable<any> {
    return this.apiService.delete<any>(`Users/${userId}`);
  }
}
