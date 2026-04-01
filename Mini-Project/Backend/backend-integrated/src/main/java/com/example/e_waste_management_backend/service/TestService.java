package com.example.e_waste_management_backend.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class TestService {

    @Async
    public CompletableFuture<String> longProcess() {

        try {
            Thread.sleep(5000);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return CompletableFuture.completedFuture("Done!");
    }
}
