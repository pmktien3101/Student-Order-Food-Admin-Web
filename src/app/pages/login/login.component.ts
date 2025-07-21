import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = {
    "identifier": "",
    "password": ""
  };

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(private apiService: ApiService, private router: Router) {}

  onLogin() {
    debugger
    this.apiService.post<any>('Authentications/login', this.loginData).subscribe({
      next: (response) => {
        debugger
        console.log("Login successful:", response);
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('userRole', response.data.userRole);
        
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials.");
      }
  })
}
}