package com.bug_reporter.backend.dto.request;

import com.bug_reporter.backend.model.enums.VoteType;
import jakarta.validation.constraints.NotNull;

public record VoteCommentRequest(
        @NotNull(message = "Comment ID is required")
        Long commentId,

        @NotNull(message = "Vote type is required")
        VoteType type
) {}
