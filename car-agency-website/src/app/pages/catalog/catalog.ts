import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car';
import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-catalog',
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss'
})
export class CatalogComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  selectedCategory = 'all';
  searchQuery = '';
  availableTimeSlots: string[] = [];
  minDate: string;
  selectedCarId: number | null = null;
  
  bookingData = {
    carId: 0,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  };

  constructor(
    private carService: CarService,
    private bookingService: BookingService
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.loadCars();
    this.loadAvailableTimeSlots();
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe(cars => {
      this.cars = cars;
      this.filteredCars = cars;
    });
  }

  loadAvailableTimeSlots(): void {
    const today = new Date().toISOString().split('T')[0];
    this.bookingService.getAvailableTimeSlots(today).subscribe(slots => {
      this.availableTimeSlots = slots;
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = this.cars;

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(car => car.category === this.selectedCategory);
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(query) ||
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query)
      );
    }

    this.filteredCars = filtered;
  }

  viewDetails(carId: number): void {
    // For demo purposes, show alert
    // In a real app, this would navigate to a detailed car page
    alert(`Viewing details for car ID: ${carId}`);
  }

  bookVisit(carId: number): void {
    this.selectedCarId = carId;
    this.bookingData.carId = carId;
    
    // For demo purposes, show alert instead of modal
    // In a real app with Bootstrap JS, this would open the modal
    const car = this.cars.find(c => c.id === carId);
    if (car) {
      const customerName = prompt('Enter your full name:');
      const customerEmail = prompt('Enter your email:');
      const customerPhone = prompt('Enter your phone number:');
      const preferredDate = prompt('Enter preferred date (YYYY-MM-DD):');
      const preferredTime = prompt('Enter preferred time (e.g., 10:00 AM):');
      
      if (customerName && customerEmail && customerPhone && preferredDate && preferredTime) {
        this.bookingData = {
          carId,
          customerName,
          customerEmail,
          customerPhone,
          preferredDate,
          preferredTime,
          message: ''
        };
        
        this.onBooking();
      }
    }
  }

  onBooking(): void {
    if (this.bookingData.customerName && this.bookingData.customerEmail && 
        this.bookingData.customerPhone && this.bookingData.preferredDate && 
        this.bookingData.preferredTime) {
      
      this.bookingService.createBooking(this.bookingData).subscribe(booking => {
        alert(`Booking confirmed! Booking ID: ${booking.id}. We'll contact you soon.`);
        
        // Reset form
        this.bookingData = {
          carId: 0,
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          preferredDate: '',
          preferredTime: '',
          message: ''
        };
      });
    }
  }
}

