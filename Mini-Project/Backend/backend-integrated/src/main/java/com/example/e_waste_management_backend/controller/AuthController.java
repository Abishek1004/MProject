package com.example.e_waste_management_backend.controller;

import com.example.e_waste_management_backend.dto.*;
import com.example.e_waste_management_backend.entity.User;
import com.example.e_waste_management_backend.repository.UserRepository;
import com.example.e_waste_management_backend.service.AuthServiceImpl;
import com.example.e_waste_management_backend.util.JwtUtil;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthServiceImpl authService;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDTO dto) {
        String result = authService.register(dto);
        return result.equals("Email already registered")
                ? ResponseEntity.badRequest().body(Map.of("message", result))
                : ResponseEntity.ok(Map.of("message", result));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO dto) {

        User user = userRepository.findByEmail(dto.getEmail()).orElse(null);

        if (user == null)
            return ResponseEntity.badRequest().body(Map.of("message", "No account found"));

        if (!user.isVerified())
            return ResponseEntity.badRequest().body(Map.of("message", "Verify email first"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword()))
            return ResponseEntity.badRequest().body(Map.of("message", "Incorrect password"));

        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(new AuthResponse(token,
                new AuthResponse.UserInfo(user.getId(), user.getName(), user.getEmail(), user.getMobileNo())));
    }
}