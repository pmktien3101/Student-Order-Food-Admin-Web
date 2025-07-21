import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

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
    { label: 'User Account', link: '/user', icon: 'far fa-clone' },
    { label: 'Shop Account', link: '/shop', icon: 'far fa-address-book' },
    { label: 'WithDraw', link: '/withdraw', icon: 'far fa-address-book' },
    { label: 'Category', link: '/category', icon: 'far fa-address-book' },
  ];

  activeIndex = 0;
  horiSelectorStyle = { top: '0px', left: '0px', height: '0px', width: '0px' };
  userId: string = '';

  constructor(private renderer: Renderer2, private router: Router) {
  }

  ngOnInit() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        debugger
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
