import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  constructor(private apiService: ApiService) {}

  getAllShopRegister(pageIndex: number, pageSize: number): Observable<any> {
    const params = { PageIndex: pageIndex, PageSize: pageSize };
    return this.apiService.get<any>('Shops/status/Pending', params);
  }
  approveShopRegister(shopId: string, isApproved: boolean, note: string): Observable<any> {
    const body = { shopId, isApproved, note };
    return this.apiService.post<any>('Shops/approve-reject', body);
  }

}
