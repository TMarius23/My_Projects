package com.bug_reporter.email_service.service;

import com.bug_reporter.email_service.dto.EmailRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromAddress;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(EmailRequest request) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromAddress);
            message.setTo(request.to());
            message.setSubject(request.subject());
            message.setText(request.body());
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send email to " + request.to() + ": " + e.getMessage());
        }
    }
}
