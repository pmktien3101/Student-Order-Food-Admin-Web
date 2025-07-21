import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../services/shop.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  imports: [CommonModule, FormsModule]
})
export class ShopComponent implements OnInit {
  shops: any[] = [];
  error: string = '';
  loading: boolean = false;
  pageIndex: number = 1;
  pageSize: number = 5;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getShops();
  }

  getShops(): void {
    this.loading = true;
    this.error = '';
    this.shopService.getAllShopRegister(this.pageIndex, this.pageSize).subscribe({
      next: (data) => {
        console.log('DATA', data)
        if (Array.isArray(data)) {
          this.shops = data;
        } else if (data && Array.isArray(data.data?.items)) {
          this.shops = data.data.items;
        } else {
          this.shops = [];
        }
        if (this.shops.length === 0) {
          this.error = 'No shops found.';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Lỗi khi lấy danh sách shop';
        this.loading = false;
        console.error('Shop API error:', err);
      }
    });
  }

  approveShop(shopId: string, isApproved: boolean, note: string = ''): void {
    this.loading = true;
    this.shopService.approveShopRegister(shopId, isApproved, note).subscribe({
      next: (res) => {
        this.shops = this.shops.filter(shop => shop.id !== shopId);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Lỗi khi duyệt shop';
        this.loading = false;
        console.error('Approve shop error:', err);
      }
    });
  }
}
