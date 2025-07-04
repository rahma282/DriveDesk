package com.cars.car_app.service;

import com.cars.car_app.model.User;
import com.cars.car_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User saveUser(User user) {
        // user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // PATCH user by ID
    public User patchUser(Long id, User updatedUser) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (updatedUser.getEmail() != null) {
            existingUser.setEmail(updatedUser.getEmail());
        }

        if (updatedUser.getName() != null) {
            existingUser.setName(updatedUser.getName());
        }

        if (updatedUser.getPassword() != null) {
            // existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            existingUser.setPassword(updatedUser.getPassword());
        }

        if (updatedUser.getRole() != null) {
            existingUser.setRole(updatedUser.getRole());
        }

        return userRepository.save(existingUser);
    }
}
