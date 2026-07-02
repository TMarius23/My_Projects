package com.bug_reporter.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TagCreateRequest(
        @NotBlank(message = "Tag name is required")
        @Size(max = 50, message = "Tag name must be at most 50 characters")
        String name
) {}
