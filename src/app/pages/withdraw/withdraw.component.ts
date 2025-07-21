import { Component, OnInit } from '@angular/core';
import { DecimalPipe, DatePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.scss',
  imports: [CommonModule, FormsModule, DecimalPipe, DatePipe]
})
export class WithdrawComponent implements OnInit {
  pendingWithdraws: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.fetchPendingWithdraws();
  }

  fetchPendingWithdraws() {
    this.loading = true;
    this.transactionService.getAllWithDraws().subscribe({
      next: (res) => {
        this.pendingWithdraws = res.data || res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Lỗi khi tải danh sách rút tiền';
        this.loading = false;
      }
    });
  }

  approveWithdraw(item: any, isApproved: boolean) {
    const note = item.adminNote || (isApproved ? 'Duyệt rút tiền' : 'Từ chối rút tiền');
    this.transactionService.approveWithDraw(item.id || item.transactionId, isApproved, note).subscribe({
      next: () => {
        this.fetchPendingWithdraws();
      },
      error: () => {
        alert('Có lỗi khi duyệt yêu cầu!');
      }
    });
  }

  handleApproveWithdraw(item: any, isApproved: boolean, note: string, type: 'approve' | 'reject') {
    this.approveWithdraw({ ...item, adminNote: note }, isApproved);
    if (type === 'approve') item._showApprove = false;
    if (type === 'reject') item._showReject = false;
  }
}
