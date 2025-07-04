package com.cars.car_app.controller;

import com.cars.car_app.model.Car;
import com.cars.car_app.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:4200") // Allows requests from Angular frontend
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/{id}")
    public Optional<Car> getCarById(@PathVariable Long id) {
        return carService.getCarById(id);
    }

    @PostMapping
    public Car createCar(@RequestBody Car car) {
        return carService.saveCar(car);
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
    }

    // PATCH /api/cars/{id}
    @PatchMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car updatedCar) {
        Car car = carService.updateCar(id, updatedCar);
        return ResponseEntity.ok(car);
    }
}
