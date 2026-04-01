package com.example.e_waste_management_backend.repository;

import com.example.e_waste_management_backend.entity.PendingUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface PendingUserRepository extends JpaRepository<PendingUser, Long> {

    Optional<PendingUser> findByEmail(String email);

    @Modifying
    @Transactional
    void deleteByEmail(String email);
}
