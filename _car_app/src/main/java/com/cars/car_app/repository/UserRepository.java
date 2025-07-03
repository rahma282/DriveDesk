package com.cars.car_app.repository;

import com.cars.car_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}

/**
 * JpaRepository<EntityName, IDType>

Spring will automatically generate all needed methods like:

save()

findById()

findAll()

deleteById()
 */
