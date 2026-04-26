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
@CrossOrigin(origins = "*")
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

    /**
     * Admin Endpoints for User Management
     */
    
    // GET: Fetch all users
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // POST: Insert a new user
    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if (user.getName() == null || user.getEmail() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name and Email are required"));
        }
        
        // Defaults if not provided
        if (user.getRole() == null) user.setRole("USER");
        if (user.getStatus() == null) user.setStatus("ACTIVE");
        if (user.getDate() == null) user.setDate(java.time.LocalDateTime.now());
        
        try {
            User savedUser = userRepository.save(user);
            return ResponseEntity.status(201).body(Map.of(
                "message", "User created successfully",
                "id", savedUser.getId()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to insert user", "message", e.getMessage()));
        }
    }

    // DELETE: Remove a user by ID
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }
        try {
            userRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to delete user", "message", e.getMessage()));
        }
    }
}
