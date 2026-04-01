package com.example.e_waste_management_backend.repository;

import com.example.e_waste_management_backend.entity.PaymentRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentRecord, Long> {
    // findByRazorpayOrderId removed — Razorpay integration has been removed.
    Optional<PaymentRecord>      findByReferenceId(String referenceId);
    List<PaymentRecord>          findByUserEmailOrderByCreatedAtDesc(String email);
}
