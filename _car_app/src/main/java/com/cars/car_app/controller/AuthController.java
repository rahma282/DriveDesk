package com.cars.car_app.controller;

import com.cars.car_app.dto.AuthRequest;
import com.cars.car_app.dto.AuthResponse;
import com.cars.car_app.model.User;
import com.cars.car_app.service.UserService;
import com.cars.car_app.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        // Password will be hashed inside saveUser
        return userService.saveUser(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        User user = userService.getUserByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // Check hashed password
        boolean isPasswordMatch = userService.isPasswordValid(request.getPassword(), user.getPassword());

        if (!isPasswordMatch) {
            throw new RuntimeException("Invalid credentials");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token);
    }
}
