import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
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

  constructor(private authService: AuthService, private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    if (this.loginData.email && this.loginData.password) {
      this.authService.login(this.loginData).subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          alert('Login successful!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert('Login failed: Invalid email or password');
          console.error(err);
        }
      });
    }
  }
}
