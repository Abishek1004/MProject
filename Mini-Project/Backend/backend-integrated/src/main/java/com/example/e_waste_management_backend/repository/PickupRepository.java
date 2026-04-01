package com.example.e_waste_management_backend.repository;

import com.example.e_waste_management_backend.entity.PickupRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PickupRepository extends JpaRepository<PickupRequest, Long> {
    List<PickupRequest> findByUserEmailOrderByCreatedAtDesc(String email);
    List<PickupRequest> findAllByOrderByCreatedAtDesc();
}
