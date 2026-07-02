package com.bug_reporter.backend.dto.response;

public record TagUsageResponse(
        Long id,
        String name,
        long count
) {}
