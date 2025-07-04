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

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    public List<Reservation> getReservationsByUserId(Long userId) {
        return reservationRepository.findByUserId(userId);
    }

    public Reservation saveReservation(Reservation reservation) {
        boolean exists = reservationRepository.existsByCarAndReservationDate(
                reservation.getCar(), reservation.getReservationDate()
        );

        if (exists) {
            throw new IllegalStateException("This car is already reserved on the selected date.");
        }

        return reservationRepository.save(reservation);
    }

    public Reservation createReservation(Long carId, Long userId, LocalDate reservationDate) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean exists = reservationRepository.existsByCarAndReservationDate(car, reservationDate);
        if (exists) {
            throw new IllegalStateException("Car is already reserved on this date.");
        }

        Reservation reservation = new Reservation();
        reservation.setCar(car);
        reservation.setUser(user);
        reservation.setReservationDate(reservationDate);

        return reservationRepository.save(reservation);
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    // ✅ PATCH / update reservation
    public Reservation updateReservation(Long reservationId, Long newCarId, Long newUserId, LocalDate newDate) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        Car car = carRepository.findById(newCarId)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        User user = userRepository.findById(newUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if the new date for the same car is already reserved by someone else
        boolean conflict = reservationRepository.existsByCarAndReservationDate(car, newDate);
        if (conflict && !(car.getId() == reservation.getCar().getId() && newDate.equals(reservation.getReservationDate()))) {
            throw new IllegalStateException("Car is already reserved on this date.");
        }

        reservation.setCar(car);
        reservation.setUser(user);
        reservation.setReservationDate(newDate);

        return reservationRepository.save(reservation);
    }
}
