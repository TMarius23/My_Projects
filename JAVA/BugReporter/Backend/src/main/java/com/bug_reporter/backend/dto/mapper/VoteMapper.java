package com.bug_reporter.backend.dto.mapper;

import com.bug_reporter.backend.dto.response.VoteResponse;
import com.bug_reporter.backend.model.Vote;

public final class VoteMapper {

    private VoteMapper() {
    }

    public static VoteResponse toResponse(Vote vote) {
        if (vote == null) return null;
        return new VoteResponse(
                vote.getId(),
                vote.getType(),
                UserMapper.toSummary(vote.getUser()),
                vote.getBug() == null ? null : vote.getBug().getId(),
                vote.getComment() == null ? null : vote.getComment().getId()
        );
    }
}
