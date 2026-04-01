package com.example.e_waste_management_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class EWasteManagementBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EWasteManagementBackendApplication.class, args);
	}

}
