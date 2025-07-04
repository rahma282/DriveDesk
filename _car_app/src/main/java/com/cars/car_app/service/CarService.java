package com.cars.car_app.service;

import com.cars.car_app.model.Car;
import com.cars.car_app.model.CarSpecs;
import com.cars.car_app.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }

    public Car saveCar(Car car) {
        return carRepository.save(car);
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    public Car updateCar(Long id, Car updatedCar) {
        return carRepository.findById(id)
                .map(existingCar -> {
                    existingCar.setName(updatedCar.getName());
                    existingCar.setBrand(updatedCar.getBrand());
                    existingCar.setModel(updatedCar.getModel());
                    existingCar.setPrice(updatedCar.getPrice());
                    existingCar.setYear(updatedCar.getYear());
                    existingCar.setImageUrl(updatedCar.getImageUrl());
                    existingCar.setCategory(updatedCar.getCategory());
                    existingCar.setDescription(updatedCar.getDescription());
                    existingCar.setAvailable(updatedCar.isAvailable());
                    existingCar.setFeatures(updatedCar.getFeatures());

                    // Update embedded specs
                    CarSpecs updatedSpecs = updatedCar.getSpecs();
                    if (updatedSpecs != null) {
                        CarSpecs specs = existingCar.getSpecs();
                        if (specs == null) specs = new CarSpecs();

                        specs.setEngine(updatedSpecs.getEngine());
                        specs.setHorsepower(updatedSpecs.getHorsepower());
                        specs.setAcceleration(updatedSpecs.getAcceleration());
                        specs.setTopSpeed(updatedSpecs.getTopSpeed());
                        specs.setTransmission(updatedSpecs.getTransmission());
                        specs.setFuelType(updatedSpecs.getFuelType());

                        existingCar.setSpecs(specs);
                    }

                    return carRepository.save(existingCar);
                })
                .orElseThrow(() -> new RuntimeException("Car not found with ID: " + id));
    }
}
