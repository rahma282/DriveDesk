package com.cars.car_app.controller;

import com.cars.car_app.model.Reservation;
import com.cars.car_app.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public Optional<Reservation> getReservationById(@PathVariable Long id) {
        return reservationService.getReservationById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Reservation> getReservationsByUserId(@PathVariable Long userId) {
        return reservationService.getReservationsByUserId(userId);
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.saveReservation(reservation);
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }

    // PATCH /api/reservations/{id}
    @PatchMapping("/{id}")
    public Reservation updateReservation(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updates
    ) {
        Long carId = Long.valueOf(updates.get("carId").toString());
        Long userId = Long.valueOf(updates.get("userId").toString());
        LocalDate reservationDate = LocalDate.parse(updates.get("reservationDate").toString());

        return reservationService.updateReservation(id, carId, userId, reservationDate);
    }
}
