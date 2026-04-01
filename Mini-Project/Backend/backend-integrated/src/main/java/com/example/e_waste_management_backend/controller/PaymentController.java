package com.example.e_waste_management_backend.controller;

import com.example.e_waste_management_backend.service.RazorpayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * PaymentController — Razorpay removed.
 *
 * Previously this controller handled Razorpay order creation and signature
 * verification. It now exposes a single endpoint for scheduling a free device
 * pickup and returning a reference ID to the frontend.
 *
 * POST /api/payment/schedule-pickup
 *   Body: { "amount": 5000, "deviceVariant": "iPhone 12", "userEmail": "a@b.com" }
 *   Response: { "referenceId": "ECO-XXXXXXXX", "status": "SCHEDULED", ... }
 */
@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class PaymentController {

    @Autowired
    private RazorpayService razorpayService;

    // ─── POST /api/payment/schedule-pickup ───────────────────────────────────
    @PostMapping("/schedule-pickup")
    public ResponseEntity<?> schedulePickup(@RequestBody Map<String, Object> body) {
        try {
            double amount = body.get("amount") != null
                    ? Double.parseDouble(body.get("amount").toString())
                    : 0;
            String deviceVariant = body.getOrDefault("deviceVariant", "Unknown device").toString();
            String userEmail     = body.getOrDefault("userEmail", "").toString();

            if (amount <= 0) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Invalid amount"));
            }

            Map<String, Object> result = razorpayService.schedulePickup(amount, deviceVariant, userEmail);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", "Failed to schedule pickup: " + e.getMessage()));
        }
    }
}
