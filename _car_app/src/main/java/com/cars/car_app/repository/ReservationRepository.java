package com.cars.car_app.repository;

import com.cars.car_app.model.Car;
import com.cars.car_app.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUserId(Long userId);

    boolean existsByCarAndReservationDate(Car car, LocalDate reservationDate);
}
