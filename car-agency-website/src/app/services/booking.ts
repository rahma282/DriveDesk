import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BookingRequest } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings: BookingRequest[] = [];
  private nextId = 1;

  constructor() { }

  createBooking(booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>): Observable<BookingRequest> {
    const newBooking: BookingRequest = {
      ...booking,
      id: this.nextId++,
      status: 'pending',
      createdAt: new Date()
    };
    
    this.bookings.push(newBooking);
    return of(newBooking);
  }

  getBookingById(id: number): Observable<BookingRequest | undefined> {
    const booking = this.bookings.find(b => b.id === id);
    return of(booking);
  }

  getAllBookings(): Observable<BookingRequest[]> {
    return of(this.bookings);
  }

  updateBookingStatus(id: number, status: 'pending' | 'confirmed' | 'cancelled'): Observable<BookingRequest | undefined> {
    const booking = this.bookings.find(b => b.id === id);
    if (booking) {
      booking.status = status;
    }
    return of(booking);
  }

  getAvailableTimeSlots(date: string): Observable<string[]> {
    // Mock available time slots
    const timeSlots = [
      '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
      '05:00 PM', '06:00 PM'
    ];
    
    // Filter out already booked slots for the given date
    const bookedSlots = this.bookings
      .filter(b => b.preferredDate === date && b.status !== 'cancelled')
      .map(b => b.preferredTime);
    
    const availableSlots = timeSlots.filter(slot => !bookedSlots.includes(slot));
    return of(availableSlots);
  }
}

