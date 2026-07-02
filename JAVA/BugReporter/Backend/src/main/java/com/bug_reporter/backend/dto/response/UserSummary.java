package com.bug_reporter.backend.dto.response;

public record UserSummary(
        Long id,
        String username,
        double score
) {}
