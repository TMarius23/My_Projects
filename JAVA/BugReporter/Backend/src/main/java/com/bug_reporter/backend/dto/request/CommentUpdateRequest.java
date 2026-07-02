package com.bug_reporter.backend.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CommentUpdateRequest(
        @NotBlank(message = "Comment is required")
        String comment,

        String imageUrl
) {}
