package com.cars.car_app.model;

import java.util.List;   
import jakarta.persistence.*; // JPA annotations like @Entity, @Id, @OneToMany
import lombok.*;  // Lombok annotations like @Data, @NoArgsConstructor

@Entity //It will map to a table in the database named user by default
@Data // Comes from Lombok. It generates: Getters & Setters , toString() ,equals(), hashCode() You don't need to write boilerplate manually
@NoArgsConstructor  // Lombok again. These generate: A no-argument constructor A constructor with all fields
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // AUTO_INCREMENT
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Reservation> reservations; // cars listed by this user
}
