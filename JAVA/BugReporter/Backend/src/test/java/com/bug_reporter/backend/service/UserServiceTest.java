package com.bug_reporter.backend.service;

import com.bug_reporter.backend.dto.request.UserUpdateRequest;
import com.bug_reporter.backend.dto.response.UserResponse;
import com.bug_reporter.backend.model.User;
import com.bug_reporter.backend.model.enums.UserRole;
import com.bug_reporter.backend.repository.UserRepository;
import com.bug_reporter.backend.repository.VoteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private VoteRepository voteRepository;

    @InjectMocks
    private UserService userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testUser");
        testUser.setEmail("test@example.com");
        testUser.setPassword("encodedPass");
        testUser.setRole(UserRole.USER);
    }

    @Test
    void getAllUsers() {
        when(userRepository.findAll()).thenReturn(List.of(testUser));

        List<UserResponse> result = userService.getAllUserResponses();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("testUser", result.get(0).username());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void getUserById() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        java.util.Optional<UserResponse> result = userService.getUserResponseById(1L);

        assertTrue(result.isPresent());
        assertEquals("testUser", result.get().username());
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void updateUser() {
        UserUpdateRequest request = new UserUpdateRequest("updatedName", "updated@example.com", UserRole.USER, "newPass");

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(passwordEncoder.encode("newPass")).thenReturn("encodedNewPass");
        when(userRepository.save(testUser)).thenReturn(testUser);

        UserResponse result = userService.updateUser(1L, request, 1L);

        assertNotNull(result);
        assertEquals("updatedName", testUser.getUsername());
        assertEquals("updated@example.com", testUser.getEmail());
        assertEquals(UserRole.USER, testUser.getRole());
        verify(passwordEncoder, times(1)).encode("newPass");
        verify(userRepository, times(1)).save(testUser);
    }

    @Test
    void updateUser_notFound() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        UserUpdateRequest request = new UserUpdateRequest("testUser", "test@example.com", UserRole.USER, null);
        assertThrows(RuntimeException.class, () -> userService.updateUser(99L, request, 1L));
    }

    @Test
    void deleteUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        userService.deleteUser(1L, 1L);

        verify(userRepository, times(1)).delete(testUser);
    }

    @Test
    void deleteUser_notFound() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> userService.deleteUser(99L, 1L));
    }
}
