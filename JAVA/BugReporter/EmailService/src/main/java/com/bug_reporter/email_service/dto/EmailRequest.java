package com.bug_reporter.email_service.dto;

public record EmailRequest(String to, String subject, String body) {
}
