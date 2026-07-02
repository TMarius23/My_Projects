package com.bug_reporter.backend.dto.request;

import com.bug_reporter.backend.model.enums.VoteType;
import jakarta.validation.constraints.NotNull;

public record VoteBugRequest(
        @NotNull(message = "Bug ID is required")
        Long bugId,

        @NotNull(message = "Vote type is required")
        VoteType type
) {}
