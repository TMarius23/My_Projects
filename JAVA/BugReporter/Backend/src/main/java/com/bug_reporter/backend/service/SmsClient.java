package com.bug_reporter.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class SmsClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String smsServiceUrl = "http://localhost:8082/api/sms/send";

    public void send(String to, String body) {
        if (to == null || to.isBlank()) {
            return;
        }
        try {
            Map<String, String> payload = new HashMap<>();
            payload.put("to", to);
            payload.put("body", body);
            restTemplate.postForEntity(smsServiceUrl, payload, String.class);
        } catch (Exception e) {
            System.err.println("SmsClient: Failed to reach SmsService at " + smsServiceUrl + ": " + e.getMessage());
            e.printStackTrace();
        }
    }
}
