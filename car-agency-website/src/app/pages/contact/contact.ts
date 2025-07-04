import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  contactData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false
  };

  onSubmit(): void {
    if (this.contactData.firstName && this.contactData.lastName && 
        this.contactData.email && this.contactData.subject && 
        this.contactData.message) {
      
      console.log('Contact form submitted:', this.contactData);
      alert('Thank you for your message! We will get back to you within 24 hours.');
      
      // Reset form
      this.contactData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      };
    }
  }
}

