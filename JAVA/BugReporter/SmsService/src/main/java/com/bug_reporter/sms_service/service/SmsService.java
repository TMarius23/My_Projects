package com.bug_reporter.sms_service.service;

import com.bug_reporter.sms_service.dto.SmsRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SmsService {

    @Value("${textbee.api-key}")
    private String apiKey;

    @Value("${textbee.device-id}")
    private String deviceId;

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendSms(SmsRequest request) {
        System.out.println("Attempting to send SMS to: " + request.to());
        if (apiKey == null || apiKey.isBlank() || deviceId == null || deviceId.isBlank()) {
            System.err.println("TextBee API Key or Device ID not configured. API Key: " + apiKey + ", Device ID: " + deviceId);
            return;
        }

        String url = String.format("https://api.textbee.dev/api/v1/gateway/devices/%s/send-sms", deviceId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-api-key", apiKey);

        Map<String, Object> payload = new HashMap<>();
        payload.put("recipients", List.of(request.to()));
        payload.put("message", request.body());

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

        try {
            System.out.println("Sending request to TextBee URL: " + url);
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            System.out.println("TextBee response status: " + response.getStatusCode());
            System.out.println("TextBee response body: " + response.getBody());
            
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Failed to send SMS via TextBee: " + response.getBody());
            }
        } catch (Exception e) {
            System.err.println("Error sending SMS via TextBee: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("TextBee send failure", e);
        }
    }
}
