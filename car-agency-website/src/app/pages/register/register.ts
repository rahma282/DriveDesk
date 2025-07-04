import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  showPassword = false;
  showConfirmPassword = false;

  registerData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    newsletter: false
  };

  constructor(private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordsMatch(): boolean {
    return this.registerData.password === this.registerData.confirmPassword;
  }

  onRegister(): void {
    if (this.isFormValid()) {
      // For demo purposes, we'll just show a success message and redirect
      // In a real app, this would call an authentication service
      console.log('Registration attempt:', this.registerData);

      // Simulate successful registration
      alert('Registration successful! Welcome to DriveDesk.');

      // Redirect to login page
      this.router.navigate(['/login']);

      // Reset form
      this.registerData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
        newsletter: false
      };
    }
  }

  private isFormValid(): boolean {
    return this.registerData.firstName.length >= 2 &&
           this.registerData.lastName.length >= 2 &&
           this.registerData.email.includes('@') &&
           this.registerData.phone.length > 0 &&
           this.registerData.password.length >= 8 &&
           this.passwordsMatch() &&
           this.registerData.agreeTerms;
  }
}

