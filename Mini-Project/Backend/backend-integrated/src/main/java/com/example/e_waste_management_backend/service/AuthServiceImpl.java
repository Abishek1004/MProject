package com.example.e_waste_management_backend.service;

import com.example.e_waste_management_backend.dto.UserDTO;
import com.example.e_waste_management_backend.entity.PendingUser;
import com.example.e_waste_management_backend.repository.PendingUserRepository;
import com.example.e_waste_management_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthServiceImpl {

    @Autowired
    private PendingUserRepository pendingRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public String register(UserDTO dto) {

        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            return "Email already registered";
        }

        pendingRepo.deleteByEmail(dto.getEmail());

        String otp = String.valueOf(100000 + new Random().nextInt(900000));

        PendingUser pending = new PendingUser();
        pending.setName(dto.getName());
        pending.setEmail(dto.getEmail());
        pending.setPassword(passwordEncoder.encode(dto.getPassword()));
        pending.setMobileNo(dto.getMobileNo());
        pending.setOtp(otp);
        pending.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        pendingRepo.save(pending);
        notificationService.sendOtpMail(dto.getEmail(), otp);

        return "OTP sent to your email";
    }
}
