package com.bug_reporter.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class EmailClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String emailServiceUrl = "http://localhost:8081/api/email/send";

    public void send(String to, String subject, String body) {
        try {
            Map<String, String> payload = new HashMap<>();
            payload.put("to", to);
            payload.put("subject", subject);
            payload.put("body", body);
            restTemplate.postForEntity(emailServiceUrl, payload, String.class);
        } catch (Exception e) {
            System.err.println("EmailClient: Failed to reach EmailService at " + emailServiceUrl + ": " + e.getMessage());
            e.printStackTrace();
        }
    }
}
