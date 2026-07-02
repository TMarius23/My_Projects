package com.bug_reporter.backend.service;

import com.bug_reporter.backend.dto.mapper.UserMapper;
import com.bug_reporter.backend.dto.request.LoginRequest;
import com.bug_reporter.backend.dto.request.RegisterRequest;
import com.bug_reporter.backend.dto.response.UserResponse;
import com.bug_reporter.backend.model.User;
import com.bug_reporter.backend.model.enums.UserRole;
import com.bug_reporter.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final HttpSessionSecurityContextRepository securityContextRepository;
    private final EmailClient emailClient;

    @Autowired
    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       HttpSessionSecurityContextRepository securityContextRepository,
                       EmailClient emailClient) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.securityContextRepository = securityContextRepository;
        this.emailClient = emailClient;
    }

    public UserResponse register(RegisterRequest request) {
        if (request.username() == null || request.username().trim().isEmpty()) {
            throw new RuntimeException("Username is required");
        }
        if (request.email() == null || request.email().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }
        if (request.password() == null || request.password().trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }
        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Email already exists" + request.email());
        }
        if (userRepository.existsByUsername(request.username())) {
            throw new RuntimeException("Username already exists" + request.username());
        }

        User user = new User();
        user.setUsername(request.username().trim());
        user.setEmail(request.email().trim());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setPhoneNumber(request.phoneNumber() == null ? null : request.phoneNumber().trim());
        user.setRole(UserRole.USER);
        userRepository.save(user);
        emailClient.send(
            user.getEmail(),
            "Welcome to BugReporter!",
            "Hello " + user.getUsername() + ",\n\n" +
            "Thank you for registering on BugReporter!\n" +
            "You can now report bugs, comment, and vote.\n\n" +
            "The BugReporter Team"
        );
        return UserMapper.toResponse(user);
    }

    public UserResponse login(LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response) {
        User user = userRepository.findByEmail(loginRequest.email()).orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        if (user.isBanned()) {
            throw new IllegalStateException("Your account has been banned");
        }

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(user.getId(), null, List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())));

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authToken);
        SecurityContextHolder.setContext(context);

        securityContextRepository.saveContext(context, request, response);
        HttpSession session = request.getSession(true);
        session.setAttribute("userId", user.getId());
        session.setAttribute("userEmail", user.getEmail());
        session.setAttribute("userRole", user.getRole().name());

        return UserMapper.toResponse(user);
    }

    public void logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }

    public UserResponse getCurrentUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        return UserMapper.toResponse(user);
    }
}