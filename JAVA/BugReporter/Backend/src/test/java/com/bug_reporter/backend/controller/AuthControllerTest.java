package com.bug_reporter.backend.controller;

import com.bug_reporter.backend.dto.request.LoginRequest;
import com.bug_reporter.backend.dto.request.RegisterRequest;
import com.bug_reporter.backend.dto.response.UserResponse;
import com.bug_reporter.backend.dto.mapper.UserMapper;
import com.bug_reporter.backend.model.User;
import com.bug_reporter.backend.model.enums.UserRole;
import com.bug_reporter.backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthControllerTest {

    @Mock
    private AuthService authService;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @InjectMocks
    private AuthController authController;

    private User testUser;
    private UserResponse testUserResponse;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testUser");
        testUser.setEmail("test@example.com");
        testUser.setRole(UserRole.USER);
        testUserResponse = UserMapper.toResponse(testUser);
    }

    @Test
    void register() {
        RegisterRequest body = new RegisterRequest("testUser", "test@example.com", "password123", "+40712345678");

        when(authService.register(body)).thenReturn(testUserResponse);

        ResponseEntity<?> result = authController.register(body);

        assertEquals(201, result.getStatusCode().value());
        assertNotNull(result.getBody());
        verify(authService, times(1)).register(body);
    }

    @Test
    void register_error() {
        RegisterRequest body = new RegisterRequest("testUser", "test@example.com", "password123", "+40712345678");

        when(authService.register(body)).thenThrow(new RuntimeException("Email already exists"));

        ResponseEntity<?> result = authController.register(body);

        assertEquals(400, result.getStatusCode().value());
    }

    @Test
    void login() {
        LoginRequest body = new LoginRequest("test@example.com", "password123");

        when(authService.login(body, request, response)).thenReturn(testUserResponse);

        ResponseEntity<?> result = authController.login(body, request, response);

        assertEquals(200, result.getStatusCode().value());
        assertNotNull(result.getBody());
        verify(authService, times(1)).login(body, request, response);
    }

    @Test
    void login_invalidCredentials() {
        LoginRequest body = new LoginRequest("wrong@example.com", "wrongPass");

        when(authService.login(body, request, response)).thenThrow(new RuntimeException("Invalid email or password"));

        ResponseEntity<?> result = authController.login(body, request, response);

        assertEquals(401, result.getStatusCode().value());
    }

    @Test
    void logout() {
        doNothing().when(authService).logout(request);

        ResponseEntity<Void> result = authController.logout(request);

        assertEquals(204, result.getStatusCode().value());
        verify(authService, times(1)).logout(request);
    }
}
