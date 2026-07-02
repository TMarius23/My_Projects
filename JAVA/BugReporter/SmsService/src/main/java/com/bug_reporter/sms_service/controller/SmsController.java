package com.bug_reporter.sms_service.controller;

import com.bug_reporter.sms_service.dto.SmsRequest;
import com.bug_reporter.sms_service.service.SmsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sms")
public class SmsController {

    private final SmsService smsService;

    public SmsController(SmsService smsService) {
        this.smsService = smsService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendSms(@RequestBody SmsRequest request) {
        try {
            smsService.sendSms(request);
            return ResponseEntity.ok("SMS sent");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send SMS: " + e.getMessage());
        }
    }
}
