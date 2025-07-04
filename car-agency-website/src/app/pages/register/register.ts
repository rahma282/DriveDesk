import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  showPassword = false;
  showConfirmPassword = false;

  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  };

  constructor(private router: Router, private authService: AuthService) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordsMatch(): boolean {
    return this.registerData.password === this.registerData.confirmPassword;
  }

  isFormValid(): boolean {
    return this.registerData.name.trim().length >= 2 &&
           this.registerData.email.includes('@') &&
           this.registerData.password.length >= 8 &&
           this.passwordsMatch() &&
           this.registerData.agreeTerms;
  }

  onRegister(form: NgForm): void {
    if (!this.isFormValid()) return;

    const userPayload = {
      name: this.registerData.name,
      email: this.registerData.email,
      password: this.registerData.password
    };

    this.authService.register(userPayload).subscribe({
      next: () => {
        alert('Registration successful! You can now log in.');
        this.router.navigate(['/login']);
        form.resetForm();
      },
      error: (err) => {
        console.error(err);
        alert('Registration failed: ' + (err.error?.message || 'Try again later.'));
      }
    });
  }
}
