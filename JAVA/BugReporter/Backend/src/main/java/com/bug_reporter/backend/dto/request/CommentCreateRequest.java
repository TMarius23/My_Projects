package com.bug_reporter.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CommentCreateRequest(
        @NotBlank(message = "Comment is required")
        String comment,

        String imageUrl,

        @NotNull(message = "Bug ID is required")
        Long bugId
) {}
