package com.example.e_waste_management_backend.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * RazorpayService — Razorpay integration has been removed.
 *
 * This stub replaces the original payment service with a simple
 * pickup scheduling confirmation that returns a reference ID.
 * No external payment gateway is used.
 */
@Service
public class RazorpayService {

    /**
     * Generates a pickup confirmation reference for the given device/email.
     * In a production build, this would persist a PickupRequest record.
     *
     * @param amount        estimated recycle value (INR)
     * @param deviceVariant device name/variant string
     * @param userEmail     customer e-mail
     * @return confirmation map with referenceId, status, device, and amount
     */
    public Map<String, Object> schedulePickup(double amount, String deviceVariant, String userEmail) {
        String referenceId = "ECO-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Map<String, Object> result = new HashMap<>();
        result.put("referenceId", referenceId);
        result.put("status", "SCHEDULED");
        result.put("device", deviceVariant);
        result.put("estimatedValue", amount);
        result.put("userEmail", userEmail);
        result.put("message", "Pickup scheduled. We will contact you within 24 hours.");
        return result;
    }
}
