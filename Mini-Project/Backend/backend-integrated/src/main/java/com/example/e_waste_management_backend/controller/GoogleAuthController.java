package com.example.e_waste_management_backend.controller;

import com.example.e_waste_management_backend.entity.*;
import com.example.e_waste_management_backend.repository.*;
import com.example.e_waste_management_backend.util.JwtUtil;
import com.example.e_waste_management_backend.dto.AuthResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/google")
public class GoogleAuthController {

    @Autowired private GoogleUserRepository googleRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private JwtUtil jwtUtil;

    @GetMapping("/success")
    public ResponseEntity<?> googleLogin(@AuthenticationPrincipal OAuth2User principal) {

        String email = principal.getAttribute("email");
        String name  = principal.getAttribute("name");

        googleRepo.findByEmail(email).orElseGet(() -> {
            GoogleUser g = new GoogleUser();
            g.setEmail(email);
            g.setVerified(true);
            return googleRepo.save(g);
        });

        User user = userRepo.findByEmail(email).orElseGet(() -> {
            User u = new User();
            u.setEmail(email);
            u.setName(name);
            u.setVerified(true);
            return userRepo.save(u);
        });

        String token = jwtUtil.generateToken(email);

        return ResponseEntity.ok(new AuthResponse(token,
                new AuthResponse.UserInfo(user.getId(), user.getName(), user.getEmail(), user.getMobileNo())));
    }
}