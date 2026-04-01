package com.example.e_waste_management_backend.repository;

import com.example.e_waste_management_backend.entity.WithdrawalRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WithdrawalRepository extends JpaRepository<WithdrawalRequest, Long> {
    List<WithdrawalRequest> findByUserEmailOrderByCreatedAtDesc(String email);
    List<WithdrawalRequest> findAllByOrderByCreatedAtDesc();
}
