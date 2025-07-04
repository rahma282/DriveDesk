import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:8080/api/cars';

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.patch<Car>(`${this.apiUrl}/${id}`, car);
  }

  searchCars(query: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}?q=${query}`);
  }

  getCarsByCategory(category: string): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}?category=${category}`);
  }
}
