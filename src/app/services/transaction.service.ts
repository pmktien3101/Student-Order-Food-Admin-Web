import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private apiService: ApiService) {}

  getAllWithDraws(): Observable<any> {
    return this.apiService.get<any>('Transactions/withdraw/pending');
  }
  approveWithDraw(transactionId: string, isApproved: boolean, adminNote: string): Observable<any> {
    const body = { transactionId, isApproved, adminNote };
    return this.apiService.post<any>('Transactions/withdraw/process', body);
  }

}
