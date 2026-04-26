package com.example.e_waste_management_backend.controller;

import com.example.e_waste_management_backend.entity.PickupRequest;
import com.example.e_waste_management_backend.repository.PickupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pickups")
@CrossOrigin(origins = "*")
public class PickupRequestController {

    @Autowired
    private PickupRepository pickupRepository;

    @GetMapping
    public List<PickupRequest> getAllPickups() {
        return pickupRepository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    public ResponseEntity<?> createPickup(@RequestBody PickupRequest request) {
        try {
            PickupRequest saved = pickupRepository.save(request);
            return ResponseEntity.status(201).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String newStatus = body.get("status");
        String paymentStatus = body.get("paymentStatus");
        
        return pickupRepository.findById(id).map(pickup -> {
            if (newStatus != null) pickup.setStatus(newStatus);
            if (paymentStatus != null) pickup.setPaymentStatus(paymentStatus);
            pickupRepository.save(pickup);
            return ResponseEntity.ok(Map.of("message", "Updated successfully"));
        }).orElse(ResponseEntity.notFound().build());
    }
}
