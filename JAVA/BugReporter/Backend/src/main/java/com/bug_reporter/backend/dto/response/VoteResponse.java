package com.bug_reporter.backend.dto.response;

import com.bug_reporter.backend.model.enums.VoteType;

public record VoteResponse(
        Long id,
        VoteType type,
        UserSummary user,
        Long bugId,
        Long commentId
) {}
