import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  showPassword = false;
  
  loginData = {
    email: '',
    password: '',
    rememberMe: false
  };

  constructor(private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    if (this.loginData.email && this.loginData.password) {
      // For demo purposes, we'll just show a success message and redirect
      // In a real app, this would call an authentication service
      console.log('Login attempt:', this.loginData);
      
      // Simulate successful login
      alert('Login successful! Welcome back.');
      
      // Redirect to home page
      this.router.navigate(['/']);
      
      // Reset form
      this.loginData = {
        email: '',
        password: '',
        rememberMe: false
      };
    }
  }
}

