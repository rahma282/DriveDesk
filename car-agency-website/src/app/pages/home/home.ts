import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car';
import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredCars: Car[] = [];
  currentSlide = 0;
  carouselInterval: any;
  availableTimeSlots: string[] = [];
  minDate: string;

  quickBooking = {
    date: '',
    time: ''
  };

  constructor(
    private carService: CarService,
    private bookingService: BookingService
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.loadFeaturedCars();
    this.loadAvailableTimeSlots();
    this.startCarousel();
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  loadFeaturedCars(): void {
    this.carService.getAllCars().subscribe(cars => {
      console.log('Featured Cars:', cars);
      this.featuredCars = cars.slice(0, 4); // only first 4 as featured
    });
  }

  loadAvailableTimeSlots(): void {
    const today = new Date().toISOString().split('T')[0];
    this.bookingService.getAvailableTimeSlots(today).subscribe(slots => {
      this.availableTimeSlots = slots;
    });
  }

  startCarousel(): void {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.featuredCars.length;
  }

  previousSlide(): void {
    this.currentSlide = this.currentSlide === 0
      ? this.featuredCars.length - 1
      : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  onQuickBooking(): void {
    if (this.quickBooking.date && this.quickBooking.time) {
      alert(`Booking request for ${this.quickBooking.date} at ${this.quickBooking.time}. Please complete your details in the catalog section.`);
      this.quickBooking = { date: '', time: '' };
    }
  }

  bookVisit(carId: number | undefined): void {
    if (carId) {
      alert(`Booking visit for car ID: ${carId}. Redirecting to catalog for more details.`);
    }
  }

  onDateChange(): void {
    if (this.quickBooking.date) {
      this.bookingService.getAvailableTimeSlots(this.quickBooking.date).subscribe(slots => {
        this.availableTimeSlots = slots;
        this.quickBooking.time = '';
      });
    }
  }
}
