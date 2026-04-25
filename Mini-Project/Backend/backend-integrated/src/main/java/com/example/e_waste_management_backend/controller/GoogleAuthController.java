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
import org.springframework.web.servlet.view.RedirectView;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/google")
public class GoogleAuthController {
    // Logic moved to SecurityConfig.java successHandler
}