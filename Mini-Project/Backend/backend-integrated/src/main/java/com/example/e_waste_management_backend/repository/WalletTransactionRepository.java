package com.example.e_waste_management_backend.repository;

import com.example.e_waste_management_backend.entity.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {
    List<WalletTransaction> findByUserEmailOrderByCreatedAtDesc(String email);
}
