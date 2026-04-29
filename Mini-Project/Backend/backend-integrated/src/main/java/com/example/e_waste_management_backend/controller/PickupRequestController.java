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

@RestController
@RequestMapping("/api/pickups")
@CrossOrigin(origins = "*")
public class PickupRequestController {

    @Autowired
    private PickupRepository pickupRepository;

    @Autowired
    private WalletService walletService;

    @GetMapping
    public List<PickupRequest> getAllPickups() {
        return pickupRepository.findByArchivedFalseOrderByCreatedAtDesc();
    }

    @GetMapping("/history")
    public List<PickupRequest> getHistory() {
        return pickupRepository.findByArchivedTrueOrderByCreatedAtDesc();
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
