package com.example.e_waste_management_backend.controller;

import com.example.e_waste_management_backend.dto.PredictionRequest;
import com.example.e_waste_management_backend.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class PredictionController {

    @Autowired
    private PredictionService service;

    @PostMapping("/predict")
    public Map<String, Integer> predict(@RequestBody PredictionRequest request) {

        int price = service.getPrediction(request);

        return Map.of("predicted_price", price);
    }

    @PostMapping("/predict-image")
    public Map<String, Object> predictImage(@RequestParam("image") MultipartFile image) {
        return service.validatePhoneImage(image);
    }
}
