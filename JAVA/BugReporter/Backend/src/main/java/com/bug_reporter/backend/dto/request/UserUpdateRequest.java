package com.bug_reporter.backend.dto.request;

import com.bug_reporter.backend.model.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserUpdateRequest(
        @NotBlank(message = "Username is required")
        @Size(min = 3, max = 50)
        String username,

        @NotBlank(message = "Email is required")
        @Email
        String email,

        @NotNull(message = "Role is required")
        UserRole role,

        String password
) {}
