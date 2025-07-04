package com.cars.car_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class AuthResponse {
     private String token;

    public AuthResponse(String token) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
