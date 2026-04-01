package com.example.e_waste_management_backend.service;

import com.example.e_waste_management_backend.entity.Wallet;
import com.example.e_waste_management_backend.entity.WalletTransaction;
import com.example.e_waste_management_backend.repository.WalletRepository;
import com.example.e_waste_management_backend.repository.WalletTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class WalletService {

    @Autowired private WalletRepository walletRepository;
    @Autowired private WalletTransactionRepository txRepository;

    // ─── Get or create wallet ──────────────────────────────────────────────────
    public Wallet getOrCreate(String email) {
        return walletRepository.findByUserEmail(email).orElseGet(() -> {
            Wallet w = new Wallet();
            w.setUserEmail(email);
            w.setBalance(BigDecimal.ZERO);
            return walletRepository.save(w);
        });
    }

    // ─── Get balance ───────────────────────────────────────────────────────────
    public BigDecimal getBalance(String email) {
        return getOrCreate(email).getBalance();
    }

    // ─── Credit ────────────────────────────────────────────────────────────────
    @Transactional
    public void credit(String email, BigDecimal amount, String description) {
        Wallet wallet = getOrCreate(email);
        wallet.setBalance(wallet.getBalance().add(amount));
        walletRepository.save(wallet);

        WalletTransaction tx = new WalletTransaction();
        tx.setWalletId(wallet.getId());
        tx.setUserEmail(email);
        tx.setType("CREDIT");
        tx.setAmount(amount);
        tx.setDescription(description);
        txRepository.save(tx);
    }

    // ─── Debit ─────────────────────────────────────────────────────────────────
    @Transactional
    public void debit(String email, BigDecimal amount, String description) {
        Wallet wallet = getOrCreate(email);
        if (wallet.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient wallet balance");
        }
        wallet.setBalance(wallet.getBalance().subtract(amount));
        walletRepository.save(wallet);

        WalletTransaction tx = new WalletTransaction();
        tx.setWalletId(wallet.getId());
        tx.setUserEmail(email);
        tx.setType("DEBIT");
        tx.setAmount(amount);
        tx.setDescription(description);
        txRepository.save(tx);
    }

    // ─── Transaction history ───────────────────────────────────────────────────
    public List<WalletTransaction> getTransactions(String email) {
        return txRepository.findByUserEmailOrderByCreatedAtDesc(email);
    }
}
