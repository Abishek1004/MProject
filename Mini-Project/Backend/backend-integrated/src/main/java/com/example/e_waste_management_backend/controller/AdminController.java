package com.example.e_waste_management_backend.controller;

import com.example.e_waste_management_backend.entity.Admin;
import com.example.e_waste_management_backend.repository.AdminRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*") // Update based on your actual CORS configuration
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @PostConstruct
    public void init() {
        if (adminRepository.count() == 0) {
            Admin defaultAdmin = new Admin();
            defaultAdmin.setUserid("admin");
            defaultAdmin.setPassword("admin123");
            adminRepository.save(defaultAdmin);
            System.out.println("✅ Default admin created: userid=admin, password=admin123");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Map<String, String> credentials) {
        String userid = credentials.get("userid");
        String password = credentials.get("password");

        if (userid == null || password == null) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "User ID and Password are required");
            return ResponseEntity.badRequest().body(error);
        }

        Optional<Admin> optionalAdmin = adminRepository.findByUserid(userid);
        if (optionalAdmin.isPresent() && optionalAdmin.get().getPassword().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            
            Map<String, String> adminData = new HashMap<>();
            adminData.put("userid", optionalAdmin.get().getUserid());
            response.put("admin", adminData);
            
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid User ID or Password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }
}
