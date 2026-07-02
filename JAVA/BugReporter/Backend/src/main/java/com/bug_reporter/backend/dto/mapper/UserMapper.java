package com.bug_reporter.backend.dto.mapper;

import com.bug_reporter.backend.dto.response.UserResponse;
import com.bug_reporter.backend.dto.response.UserSummary;
import com.bug_reporter.backend.model.User;

public final class UserMapper {

    private UserMapper() {
    }

    public static UserResponse toResponse(User user) {
        return toResponse(user, 0.0);
    }

    public static UserResponse toResponse(User user, double score) {
        if (user == null) return null;
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                user.isBanned(),
                score,
                user.getPhoneNumber()
        );
    }

    public static UserSummary toSummary(User user) {
        return toSummary(user, 0.0);
    }

    public static UserSummary toSummary(User user, double score) {
        if (user == null) return null;
        return new UserSummary(user.getId(), user.getUsername(), score);
    }
}
