import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private apiService: ApiService) {}

  getAllCategories(): Observable<any> {
    return this.apiService.get<any>('Categories');
  }

  getCategoryById(id: string): Observable<any> {
    return this.apiService.get<any>(`Categories/${id}`);
  }

  createCategory(category: any): Observable<any> {
    return this.apiService.post<any>('Categories', category);
  }

  updateCategory(id: string, category: any): Observable<any> {
    return this.apiService.put<any>(`Categories/${id}`, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this.apiService.delete<any>(`Categories/${id}`);
  }
}
