import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-layout',
  imports: [CommonModule,RouterOutlet,RouterLink],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit, OnInit {
  @ViewChild('navbar') navbar!: ElementRef;

  navItems = [
    { label: 'Dashboard', link: '/dashboard', icon: 'fas fa-tachometer-alt' },
    { label: 'User Account', link: '/user', icon: 'fas fa-users-cog' },
    { label: 'Shop Account', link: '/shop', icon: 'fas fa-store' },
    { label: 'WithDraw', link: '/withdraw', icon: 'fas fa-money-bill-wave' },
    { label: 'Category', link: '/category', icon: 'fas fa-th-list' },
  ];

  activeIndex = 0;
  horiSelectorStyle = { top: '0px', left: '0px', height: '0px', width: '0px' };
  userId: string = '';
  userName: string = '';
  avatar: string = '';

  constructor(private renderer: Renderer2, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const CLAIM_ID = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
        const CLAIM_ROLE = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

        const id = decoded[CLAIM_ID];
        const role = decoded[CLAIM_ROLE];
        if (id) {
          this.userId = id;
          this.userService.getUserById(id).subscribe({
            next: (user) => {
              this.userName = user.data.userName || '';
              this.avatar = user.data.avatar ? user.data.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(this.userName)}`;
            },
            error: () => {
              this.userName = 'Admin';
              this.avatar = '';
            }
          });
        } else {
          this.userId = 'User';
        }
      } catch (e) {
        this.userId = 'User';
      }
    } else {
      this.userId = 'User';
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.updateHoriSelector(), 0);
    window.addEventListener('resize', () => setTimeout(() => this.updateHoriSelector(), 500));
  }

  setActive(index: number, event: MouseEvent) {
    this.activeIndex = index;
    this.updateHoriSelector();
  }

  updateHoriSelector() {
    const navbarEl = this.navbar.nativeElement as HTMLElement;
    const activeLi = navbarEl.querySelectorAll('li')[this.activeIndex] as HTMLElement;
    if (activeLi) {
      this.horiSelectorStyle = {
        top: activeLi.offsetTop + 'px',
        left: activeLi.offsetLeft + 'px',
        height: activeLi.offsetHeight + 'px',
        width: activeLi.offsetWidth + 'px'
      };
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }
}
