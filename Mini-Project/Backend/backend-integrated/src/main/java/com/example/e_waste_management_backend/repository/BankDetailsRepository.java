package com.example.e_waste_management_backend.repository;

import com.example.e_waste_management_backend.entity.BankDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BankDetailsRepository extends JpaRepository<BankDetails, Long> {
    List<BankDetails> findByUserEmailOrderByCreatedAtDesc(String email);
    Optional<BankDetails> findTopByUserEmailOrderByCreatedAtDesc(String email);
}
