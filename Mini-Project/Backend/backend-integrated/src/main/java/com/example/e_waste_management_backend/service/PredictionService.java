package com.example.e_waste_management_backend.service;

import com.example.e_waste_management_backend.dto.PredictionRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class PredictionService {

    @SuppressWarnings("unchecked")
    public int getPrediction(PredictionRequest request) {

        String url = "http://localhost:5001/predict";

        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> response =
                restTemplate.postForObject(url, request, Map.class);

        return (int) response.get("predicted_price");
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> validatePhoneImage(MultipartFile image) {
        String url = "http://localhost:5001/predict-image";

        RestTemplate restTemplate = new RestTemplate();
        try {
            byte[] bytes = image.getBytes();

            ByteArrayResource resource = new ByteArrayResource(bytes) {
                @Override
                public String getFilename() {
                    return image.getOriginalFilename() == null ? "image" : image.getOriginalFilename();
                }
            };

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("image", resource);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            return restTemplate.postForObject(url, requestEntity, Map.class);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read uploaded image bytes", e);
        }
    }
}