package com.example.e_waste_management_backend.controller;

import com.example.e_waste_management_backend.entity.PickupRequest;
import com.example.e_waste_management_backend.repository.PickupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.math.BigDecimal;
import com.example.e_waste_management_backend.service.WalletService;
import com.example.e_waste_management_backend.util.JwtUtil;

@RestController
@RequestMapping("/api/pickups")
@CrossOrigin(origins = "*")
public class PickupRequestController {

    @Autowired
    private PickupRepository pickupRepository;

    @Autowired
    private WalletService walletService;

    @Autowired
    private JwtUtil jwtUtil;

    private String getEmailFromHeader(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid token");
        }
        String token = authHeader.substring(7);
        if (!jwtUtil.isValid(token)) {
            throw new RuntimeException("Token expired or invalid");
        }
        return jwtUtil.extractEmail(token);
    }

    @GetMapping
    public List<PickupRequest> getAllPickups() {
        return pickupRepository.findByArchivedFalseOrderByCreatedAtDesc();
    }

    @GetMapping("/history")
    public List<PickupRequest> getHistory() {
        return pickupRepository.findByArchivedTrueOrderByCreatedAtDesc();
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyPickups(@RequestHeader("Authorization") String authHeader) {
        try {
            String email = getEmailFromHeader(authHeader);
            return ResponseEntity.ok(pickupRepository.findByUserEmailOrderByCreatedAtDesc(email));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<?> cancelPickup(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) {
        try {
            String email = getEmailFromHeader(authHeader);
            return pickupRepository.findById(id).map(pickup -> {
                if (!pickup.getUserEmail().equals(email)) {
                    return ResponseEntity.status(403).body(Map.of("error", "Not authorized"));
                }
                pickup.setStatus("Cancelled");
                pickup.setArchived(true); // removes from admin manage orders
                pickupRepository.save(pickup);
                return ResponseEntity.ok(Map.of("message", "Order cancelled successfully"));
            }).orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
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

    @PostMapping("/clear-all")
    public ResponseEntity<?> clearAll() {
        List<PickupRequest> active = pickupRepository.findByArchivedFalseOrderByCreatedAtDesc();
        active.forEach(p -> p.setArchived(true));
        pickupRepository.saveAll(active);
        return ResponseEntity.ok(Map.of("message", "All records cleared and moved to history"));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String newStatus = body.get("status");
        String paymentStatus = body.get("paymentStatus");
        
        return pickupRepository.findById(id).map(pickup -> {
            if (newStatus != null) pickup.setStatus(newStatus);
            if (paymentStatus != null) {
                if ("Paid".equalsIgnoreCase(paymentStatus) && !"Paid".equalsIgnoreCase(pickup.getPaymentStatus())) {
                    pickup.setPaymentStatus("Paid");
                    if (pickup.getFinalPrice() != null && pickup.getFinalPrice() > 0) {
                        walletService.credit(pickup.getUserEmail(), BigDecimal.valueOf(pickup.getFinalPrice()), "Payment for Order ID: " + pickup.getId());
                    }
                } else {
                    pickup.setPaymentStatus(paymentStatus);
                }
            }
            pickupRepository.save(pickup);
            return ResponseEntity.ok(Map.of("message", "Updated successfully"));
        }).orElse(ResponseEntity.notFound().build());
    }
}
