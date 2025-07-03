package com.cars.car_app.service;

import com.cars.car_app.model.Car;
import com.cars.car_app.model.Reservation;
import com.cars.car_app.model.User;
import com.cars.car_app.repository.CarRepository;
import com.cars.car_app.repository.ReservationRepository;
import com.cars.car_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    // Get all reservations
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    // Get reservation by ID
    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    // Get all reservations for a specific user
    public List<Reservation> getReservationsByUserId(Long userId) {
        return reservationRepository.findByUserId(userId);
    }

    // Save reservation (with conflict check)
    public Reservation saveReservation(Reservation reservation) {
        boolean exists = reservationRepository.existsByCarAndReservationDate(
                reservation.getCar(), reservation.getReservationDate()
        );

        if (exists) {
            throw new IllegalStateException("This car is already reserved on the selected date.");
        }

        return reservationRepository.save(reservation);
    }

    // Alternative: Create reservation using carId, userId, and date
    public Reservation createReservation(Long carId, Long userId, LocalDate reservationDate) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean exists = reservationRepository.existsByCarAndReservationDate(car, reservationDate);
        if (exists) {
            throw new IllegalStateException("Car is already reserved on this date.");
        }

        Reservation reservation = Reservation.builder()
                .car(car)
                .user(user)
                .reservationDate(reservationDate)
                .build();

        return reservationRepository.save(reservation);
    }

    // Delete reservation
    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}
