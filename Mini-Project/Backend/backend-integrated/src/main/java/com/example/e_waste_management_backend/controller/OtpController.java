package com.example.e_waste_management_backend.controller;

import com.example.e_waste_management_backend.entity.*;
import com.example.e_waste_management_backend.repository.*;
import com.example.e_waste_management_backend.util.JwtUtil;
import com.example.e_waste_management_backend.dto.AuthResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/otp")
public class OtpController {

    @Autowired private PendingUserRepository pendingRepo;
    @Autowired private UserRepository userRepository;
    @Autowired private JwtUtil jwtUtil;

    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestParam String email, @RequestParam String otp) {

        PendingUser pending = pendingRepo.findByEmail(email).orElse(null);

        if (pending == null)
            return ResponseEntity.badRequest().body(Map.of("message", "OTP not found"));

        if (pending.getExpiryTime().isBefore(LocalDateTime.now()))
            return ResponseEntity.badRequest().body(Map.of("message", "OTP expired"));

        if (!pending.getOtp().equals(otp))
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid OTP"));

        User user = new User();
        user.setName(pending.getName());
        user.setEmail(pending.getEmail());
        user.setPassword(pending.getPassword());
        user.setMobileNo(pending.getMobileNo());
        user.setVerified(true);

        userRepository.save(user);
        pendingRepo.delete(pending);

        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(new AuthResponse(token,
                new AuthResponse.UserInfo(user.getId(), user.getName(), user.getEmail(), user.getMobileNo())));
    }
}