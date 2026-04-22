package com.example.e_waste_management_backend.service;

import com.example.e_waste_management_backend.entity.PickupRequest;
import com.example.e_waste_management_backend.repository.PickupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class PickupService {

    @Autowired private PickupRepository pickupRepository;
    @Autowired private WalletService walletService;

    // ─── Schedule Pickup ──────────────────────────────────────────────────────
    @Transactional
    public PickupRequest schedule(String cartItemVariant, String userEmail,
                                  String scheduledDate, String timeSlot, String address) {
        PickupRequest req = new PickupRequest();
        req.setCartItemVariant(cartItemVariant);
        req.setUserEmail(userEmail);
        req.setScheduledDate(LocalDate.parse(scheduledDate));
        req.setTimeSlot(timeSlot);
        req.setAddress(address);
        req.setStatus("SCHEDULED");
        return pickupRepository.save(req);
    }

    // ─── Get user's pickups ───────────────────────────────────────────────────
    public List<PickupRequest> getMyPickups(String email) {
        return pickupRepository.findByUserEmailOrderByCreatedAtDesc(email);
    }

    // ─── Get ALL pickups (admin) ──────────────────────────────────────────────
    public List<PickupRequest> getAllPickups() {
        return pickupRepository.findAllByOrderByCreatedAtDesc();
    }

    // ─── Admin: confirm device and credit wallet ──────────────────────────────
    @Transactional
    public PickupRequest confirmAndCredit(Long pickupId, Integer finalPrice) {
        PickupRequest req = pickupRepository.findById(pickupId)
                .orElseThrow(() -> new RuntimeException("Pickup not found: " + pickupId));

        req.setFinalPrice(finalPrice);
        req.setStatus("CONFIRMED");
        pickupRepository.save(req);

        // Credit the wallet
        String desc = "Device verified: " + req.getCartItemVariant();
        walletService.credit(req.getUserEmail(), BigDecimal.valueOf(finalPrice), desc);

        return req;
    }

    // ─── Admin: mark as completed ─────────────────────────────────────────────
    @Transactional
    public PickupRequest markCompleted(Long pickupId) {
        PickupRequest req = pickupRepository.findById(pickupId)
                .orElseThrow(() -> new RuntimeException("Pickup not found: " + pickupId));
        req.setStatus("COMPLETED");
        return pickupRepository.save(req);
    }
}
