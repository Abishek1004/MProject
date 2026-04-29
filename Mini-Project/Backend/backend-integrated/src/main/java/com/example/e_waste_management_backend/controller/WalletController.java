package com.example.e_waste_management_backend.controller;

import com.example.e_waste_management_backend.entity.WalletTransaction;
import com.example.e_waste_management_backend.service.WalletService;
import com.example.e_waste_management_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wallet")
@CrossOrigin(origins = "*")
public class WalletController {

    @Autowired private WalletService walletService;
    @Autowired private JwtUtil jwtUtil;

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

    @GetMapping("/balance")
    public ResponseEntity<?> getBalance(@RequestHeader("Authorization") String authHeader) {
        try {
            String email = getEmailFromHeader(authHeader);
            BigDecimal balance = walletService.getBalance(email);
            return ResponseEntity.ok(Map.of("balance", balance));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> getHistory(@RequestHeader("Authorization") String authHeader) {
        try {
            String email = getEmailFromHeader(authHeader);
            List<WalletTransaction> transactions = walletService.getTransactions(email);
            return ResponseEntity.ok(transactions);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/withdraw")
    public ResponseEntity<?> withdraw(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> body) {
        try {
            String email = getEmailFromHeader(authHeader);
            BigDecimal amount = new BigDecimal(body.get("amount").toString());
            String method = (String) body.get("method");
            
            // Debit from wallet
            walletService.debit(email, amount, "Withdrawal to " + method);
            
            return ResponseEntity.ok(Map.of("message", "Withdrawal successful", "balance", walletService.getBalance(email)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
        }
    }
}
