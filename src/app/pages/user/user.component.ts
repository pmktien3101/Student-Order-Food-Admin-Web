import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  imports: [CommonModule]
})
export class UserComponent implements OnInit {
  users: any[] = [];
  error: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        console.log('User API response:', data);
        if (Array.isArray(data)) {
          this.users = data;
        } else if (data && Array.isArray(data.data)) {
          this.users = data.data;
        } else {
          this.users = [];
        }
      },
      error: (err) => {
        this.error = 'Lỗi khi lấy danh sách user';
        console.error('User API error:', err);
      }
    });
  }
}
