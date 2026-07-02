package com.bug_reporter.backend.dto.response;

import com.bug_reporter.backend.model.enums.UserRole;

public record UserResponse(Long id, String username, String email, UserRole role, boolean banned, double score, String phoneNumber) {
}
