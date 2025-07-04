import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private cars: Car[] = [
    {
      id: 1,
      name: 'Lamborghini Huracán',
      brand: 'Lamborghini',
      model: 'Huracán',
      year: 2024,
      price: 248000,
      image: 'assets/images/hero/hero_car_1.jpg',
      images: ['assets/images/hero/hero_car_1.jpg'],
      category: 'exotic',
      specs: {
        engine: '5.2L V10',
        horsepower: 630,
        acceleration: '0-60 mph in 2.9s',
        topSpeed: '202 mph',
        transmission: '7-Speed Dual-Clutch',
        fuelType: 'Gasoline'
      },
      features: ['All-Wheel Drive', 'Carbon Fiber Body', 'Advanced Aerodynamics', 'Racing Seats'],
      description: 'The Lamborghini Huracán represents the perfect fusion of technology and design, delivering an extraordinary driving experience.',
      available: true
    },
    {
      id: 2,
      name: 'McLaren 720S',
      brand: 'McLaren',
      model: '720S',
      year: 2024,
      price: 315000,
      image: 'assets/images/hero/hero_car_3.jpeg',
      images: ['assets/images/hero/hero_car_3.jpeg'],
      category: 'exotic',
      specs: {
        engine: '4.0L Twin-Turbo V8',
        horsepower: 710,
        acceleration: '0-60 mph in 2.8s',
        topSpeed: '212 mph',
        transmission: '7-Speed Dual-Clutch',
        fuelType: 'Gasoline'
      },
      features: ['Active Aerodynamics', 'Carbon Fiber Monocoque', 'Adaptive Suspension', 'Track Mode'],
      description: 'The McLaren 720S delivers breathtaking performance with cutting-edge technology and stunning design.',
      available: true
    },
    {
      id: 3,
      name: 'Ferrari 488 GTB',
      brand: 'Ferrari',
      model: '488 GTB',
      year: 2023,
      price: 280000,
      image: 'assets/images/catalog/catalog_car_2.jpg',
      images: ['assets/images/catalog/catalog_car_2.jpg'],
      category: 'exotic',
      specs: {
        engine: '3.9L Twin-Turbo V8',
        horsepower: 661,
        acceleration: '0-60 mph in 3.0s',
        topSpeed: '205 mph',
        transmission: '7-Speed Dual-Clutch',
        fuelType: 'Gasoline'
      },
      features: ['Side Slip Control', 'Magnetic Dampers', 'F1-Trac', 'Carbon Fiber Steering Wheel'],
      description: 'The Ferrari 488 GTB combines turbo-charged power with the legendary Ferrari driving experience.',
      available: true
    },
    {
      id: 4,
      name: 'Porsche 911 Turbo S',
      brand: 'Porsche',
      model: '911 Turbo S',
      year: 2024,
      price: 230000,
      image: 'assets/images/catalog/catalog_car_3.jpg',
      images: ['assets/images/catalog/catalog_car_3.jpg'],
      category: 'sports',
      specs: {
        engine: '3.8L Twin-Turbo Flat-6',
        horsepower: 640,
        acceleration: '0-60 mph in 2.6s',
        topSpeed: '205 mph',
        transmission: '8-Speed PDK',
        fuelType: 'Gasoline'
      },
      features: ['All-Wheel Drive', 'Active Suspension', 'Sport Chrono Package', 'Ceramic Brakes'],
      description: 'The Porsche 911 Turbo S delivers exceptional performance with everyday usability.',
      available: true
    },
    {
      id: 5,
      name: 'Aston Martin DB11',
      brand: 'Aston Martin',
      model: 'DB11',
      year: 2024,
      price: 215000,
      image: 'assets/images/hero/hero_car_2.webp',
      images: ['assets/images/hero/hero_car_2.webp'],
      category: 'luxury',
      specs: {
        engine: '4.0L Twin-Turbo V8',
        horsepower: 528,
        acceleration: '0-60 mph in 3.9s',
        topSpeed: '187 mph',
        transmission: '8-Speed Automatic',
        fuelType: 'Gasoline'
      },
      features: ['Adaptive Dampers', 'Torque Vectoring', 'Premium Leather Interior', 'Bang & Olufsen Audio'],
      description: 'The Aston Martin DB11 combines British elegance with modern performance technology.',
      available: true
    },
    {
      id: 6,
      name: 'Bentley Continental GT',
      brand: 'Bentley',
      model: 'Continental GT',
      year: 2024,
      price: 245000,
      image: 'assets/images/hero/hero_car_4.jpg',
      images: ['assets/images/hero/hero_car_4.jpg'],
      category: 'luxury',
      specs: {
        engine: '6.0L Twin-Turbo W12',
        horsepower: 626,
        acceleration: '0-60 mph in 3.6s',
        topSpeed: '207 mph',
        transmission: '8-Speed Dual-Clutch',
        fuelType: 'Gasoline'
      },
      features: ['All-Wheel Drive', 'Air Suspension', 'Rotating Display', 'Diamond Quilted Leather'],
      description: 'The Bentley Continental GT offers unparalleled luxury and grand touring performance.',
      available: true
    }
  ];

  constructor() { }

  getAllCars(): Observable<Car[]> {
    return of(this.cars);
  }

  getCarById(id: number): Observable<Car | undefined> {
    const car = this.cars.find(c => c.id === id);
    return of(car);
  }

  getCarsByCategory(category: string): Observable<Car[]> {
    const filteredCars = this.cars.filter(c => c.category === category);
    return of(filteredCars);
  }

  getFeaturedCars(): Observable<Car[]> {
    // Return first 4 cars as featured
    return of(this.cars.slice(0, 4));
  }

  searchCars(query: string): Observable<Car[]> {
    const searchTerm = query.toLowerCase();
    const filteredCars = this.cars.filter(car => 
      car.name.toLowerCase().includes(searchTerm) ||
      car.brand.toLowerCase().includes(searchTerm) ||
      car.model.toLowerCase().includes(searchTerm)
    );
    return of(filteredCars);
  }
}

