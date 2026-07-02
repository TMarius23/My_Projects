package com.bug_reporter.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record BugUpdateRequest(
        @NotBlank(message = "Title is required")
        @Size(max = 200, message = "Title must be at most 200 characters")
        String title,

        @NotBlank(message = "Text is required")
        String text,

        @Size(max = 500, message = "Picture URL must be at most 500 characters")
        String picture,

        @NotEmpty(message = "At least one tag is required")
        List<Long> tagIds
) {}
