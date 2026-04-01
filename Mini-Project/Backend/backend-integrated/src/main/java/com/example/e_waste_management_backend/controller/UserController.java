package com.example.e_waste_management_backend.controller;

import com.example.e_waste_management_backend.entity.User;
import com.example.e_waste_management_backend.repository.UserRepository;
import com.example.e_waste_management_backend.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class UserController {

    @Autowired private JwtUtil jwtUtil;
    @Autowired private UserRepository userRepository;

    /**
     * GET /api/user
     * Header: Authorization: Bearer <jwt>
     * Returns: { "firstName": "Abi" }
     */
    @GetMapping("/user")
    public ResponseEntity<?> getUser(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("message", "Missing or invalid token"));
        }

        String token = authHeader.substring(7);

        if (!jwtUtil.isValid(token)) {
            return ResponseEntity.status(401).body(Map.of("message", "Token expired or invalid"));
        }

        String email = jwtUtil.extractEmail(token);
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }

        // Extract first name (first space-separated token)
        String fullName = user.getName() != null ? user.getName().trim() : "";
        String firstName = fullName.contains(" ")
                ? fullName.substring(0, fullName.indexOf(' '))
                : fullName;

        return ResponseEntity.ok(Map.of("firstName", firstName));
    }
}
