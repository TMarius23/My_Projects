package com.bug_reporter.backend.service;

import com.bug_reporter.backend.dto.request.LoginRequest;
import com.bug_reporter.backend.dto.request.RegisterRequest;
import com.bug_reporter.backend.dto.response.UserResponse;
import com.bug_reporter.backend.model.User;
import com.bug_reporter.backend.model.enums.UserRole;
import com.bug_reporter.backend.repository.UserRepository;
import com.bug_reporter.backend.service.EmailClient;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private HttpSessionSecurityContextRepository securityContextRepository;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private HttpSession session;

    @Mock
    private EmailClient emailClient;

    @InjectMocks
    private AuthService authService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testUser");
        testUser.setEmail("test@example.com");
        testUser.setPassword("encodedPassword");
        testUser.setRole(UserRole.USER);
    }

    @Test
    void register() {
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(userRepository.existsByUsername("testUser")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        UserResponse result = authService.register(new RegisterRequest("testUser", "test@example.com", "password123", "+40712345678"));

        assertNotNull(result);
        assertEquals("testUser", result.username());
        assertEquals("test@example.com", result.email());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void register_nullUsername() {
        assertThrows(RuntimeException.class, () -> authService.register(new RegisterRequest(null, "test@example.com", "password", "+40712345678")));
    }

    @Test
    void register_emptyEmail() {
        assertThrows(RuntimeException.class, () -> authService.register(new RegisterRequest("user", "", "password", "+40712345678")));
    }

    @Test
    void register_emptyPassword() {
        assertThrows(RuntimeException.class, () -> authService.register(new RegisterRequest("user", "test@example.com", "", "+40712345678")));
    }

    @Test
    void login() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("password123", "encodedPassword")).thenReturn(true);
        when(request.getSession(true)).thenReturn(session);

        UserResponse result = authService.login(new LoginRequest("test@example.com", "password123"), request, response);

        assertNotNull(result);
        assertEquals("test@example.com", result.email());
        verify(session).setAttribute("userId", 1L);
        verify(session).setAttribute("userEmail", "test@example.com");
        verify(session).setAttribute("userRole", "USER");
    }

    @Test
    void login_invalidEmail() {
        when(userRepository.findByEmail("wrong@example.com")).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> authService.login(new LoginRequest("wrong@example.com", "password"), request, response));
    }

    @Test
    void login_invalidPassword() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("wrongPass", "encodedPassword")).thenReturn(false);

        assertThrows(RuntimeException.class,
                () -> authService.login(new LoginRequest("test@example.com", "wrongPass"), request, response));
    }

    @Test
    void logout() {
        when(request.getSession(false)).thenReturn(session);

        authService.logout(request);

        verify(session, times(1)).invalidate();
    }

    @Test
    void logout_noSession() {
        when(request.getSession(false)).thenReturn(null);

        authService.logout(request);

        verify(session, never()).invalidate();
    }
}
