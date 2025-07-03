package com.cars.car_app.repository;
import com.cars.car_app.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;

// A repository is an interface that provides CRUD operations (Create, Read, Update, Delete) for an entity.
public interface CarRepository  extends JpaRepository<Car, Long> {
    
}
