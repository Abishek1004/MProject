package com.example.e_waste_management_backend.service;

import com.example.e_waste_management_backend.entity.BankDetails;
import com.example.e_waste_management_backend.entity.WithdrawalRequest;
import com.example.e_waste_management_backend.repository.BankDetailsRepository;
import com.example.e_waste_management_backend.repository.WithdrawalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class WithdrawalService {

    @Autowired private WithdrawalRepository withdrawalRepository;
    @Autowired private BankDetailsRepository bankDetailsRepository;
    @Autowired private WalletService walletService;

    // ─── Save / upsert bank details ───────────────────────────────────────────
    @Transactional
    public BankDetails saveBankDetails(String email, String fullName, String bankName,
                                        String accountNumber, String ifscCode) {
        BankDetails bd = new BankDetails();
        bd.setUserEmail(email);
        bd.setFullName(fullName);
        bd.setBankName(bankName);
        bd.setAccountNumber(accountNumber);
        bd.setIfscCode(ifscCode);
        return bankDetailsRepository.save(bd);
    }

    // ─── Get saved bank details ───────────────────────────────────────────────
    public List<BankDetails> getBankDetails(String email) {
        return bankDetailsRepository.findByUserEmailOrderByCreatedAtDesc(email);
    }

    // ─── Create withdrawal request ────────────────────────────────────────────
    @Transactional
    public WithdrawalRequest createRequest(String email, BigDecimal amount, Long bankDetailsId) {
        // Validate balance >= 500
        BigDecimal balance = walletService.getBalance(email);
        if (balance.compareTo(BigDecimal.valueOf(500)) < 0)
            throw new RuntimeException("Minimum ₹500 required for withdrawal");
        if (balance.compareTo(amount) < 0)
            throw new RuntimeException("Insufficient wallet balance");

        BankDetails bd = bankDetailsRepository.findById(bankDetailsId)
                .orElseThrow(() -> new RuntimeException("Bank details not found"));

        // Debit the wallet immediately (hold funds)
        walletService.debit(email, amount, "Withdrawal request #pending");

        WithdrawalRequest wr = new WithdrawalRequest();
        wr.setUserEmail(email);
        wr.setAmount(amount);
        wr.setBankDetailsId(bankDetailsId);
        wr.setBankName(bd.getBankName());
        wr.setAccountNumber(bd.getAccountNumber());
        wr.setFullName(bd.getFullName());
        wr.setStatus("PENDING");
        return withdrawalRepository.save(wr);
    }

    // ─── User's requests ──────────────────────────────────────────────────────
    public List<WithdrawalRequest> getMyRequests(String email) {
        return withdrawalRepository.findByUserEmailOrderByCreatedAtDesc(email);
    }

    // ─── Admin: all requests ──────────────────────────────────────────────────
    public List<WithdrawalRequest> getAllRequests() {
        return withdrawalRepository.findAllByOrderByCreatedAtDesc();
    }

    // ─── Admin: approve or reject ─────────────────────────────────────────────
    @Transactional
    public WithdrawalRequest updateStatus(Long id, String status, String adminNote) {
        WithdrawalRequest wr = withdrawalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Withdrawal not found: " + id));

        // If rejecting, refund the wallet
        if ("REJECTED".equals(status) && "PENDING".equals(wr.getStatus())) {
            walletService.credit(wr.getUserEmail(), wr.getAmount(),
                    "Withdrawal request rejected — refunded");
        }

        wr.setStatus(status);
        if (adminNote != null) wr.setAdminNote(adminNote);
        return withdrawalRepository.save(wr);
    }
}
